/**
 * MIT License
 *
 * Copyright (c) 2022 Fastjs Team
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
class fastjsDate {
    readonly #date: number;
    readonly #createAt: number;
    private readonly construct: string;

    constructor(format: string, date: number = new Date().getTime()) {
        /*
         * Y = year
         * M = month
         * D = day
         *
         * H = hour (12)
         * A = AM/PM
         * a = am/pm
         * h = hour (24)
         * hh = hour (24) without 0
         * m = minute
         * mm = minute without 0
         * s = second
         * ss = second without 0
         * S = millisecond
         *
         * <any> to ignore (eg. "<date>: Y-M-D h:m:s")
         */

        this.format = format;
        this.#date = date;
        this.#createAt = new Date().getTime();
        this.construct = "fastjsDate";
    }

    toString(newFormat?: string): string {
        let timestamp: number = this.toNumber();
        const date: Date = new Date(timestamp);
        const year: number = date.getFullYear();
        const month: number = date.getMonth() + 1;
        const day: number = date.getDate();
        const hourDefault: number = date.getHours();
        const minuteDefault: number = date.getMinutes();
        const secondDefault: number = date.getSeconds();
        const millisecond: number = date.getMilliseconds();
        const ampm: string = hourDefault >= 12 ? "PM" : "AM";
        const ampm2: string = hourDefault >= 12 ? "pm" : "am";
        const hour12: number = hourDefault % 12;

        // add 0
        const hour: string = hourDefault < 10 ? "0" + hourDefault : hourDefault.toString();
        const minute: string = minuteDefault < 10 ? "0" + minuteDefault : minuteDefault.toString();
        const second: string = secondDefault < 10 ? "0" + secondDefault : secondDefault.toString();

        let string: string = newFormat || this.format;

        // ignore
        let token: number = 0
        let ignoreTemp: Array<string> = []
        // check ignore format
        while ((/<.*?>/.test(string))) {
            const match: RegExpMatchArray | null = string.match(/<.*?>/);
            if (match === null) break;
            // get user ignore text
            const matchString: string = match[0];
            // noinspection UnnecessaryLocalVariableJS
            const exactString: string = matchString.replace(/</g, "").replace(/>/g, "");
            ignoreTemp[token] = exactString;
            // replace ignore text to token
            string = string.replace(/<.*?>/, `{{*${token}}}`);
            token++;
        }

        interface replaceFormat {
            0: string
            1: string | number
        }

        // replace format
        const replaceFormatList: Array<replaceFormat> = [
            ["Y", year],
            ["M", month],
            ["D", day],
            ["H", hour12],
            ["A", ampm],
            ["a", ampm2],
            ["hh", hourDefault],
            ["h", hour],
            ["mm", minuteDefault],
            ["m", minute],
            ["ss", secondDefault],
            ["s", second],
            ["S", millisecond]
        ]
        replaceFormatList.forEach((e: replaceFormat) => {
            // replace keyword
            string = string.replaceAll(e[0], String(e[1]));
        })

        // replace ignore
        ignoreTemp.forEach((ignoreText: string, key: number) => {
            string = string.replace(`{{*${key}}}`, ignoreText);
        })

        return string;
    }

    toNumber(): number {
        const timeLeft = new Date().getTime() - this.#createAt;
        return this.#date + timeLeft;
    }

    toStringLocal(newFormat?: string): string {
        return new fastjsDate(newFormat || this.format, this.#date).toString()
    }

    toNumberLocal(): number {
        return this.#date;
    }

    format: string;
}

export default fastjsDate;