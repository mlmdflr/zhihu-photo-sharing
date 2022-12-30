import fs from 'fs';
import path from 'path';
import script from '@cfg';

const padLen = 20;

const dist = path.resolve(path.join(__dirname, 'src'))

!fs.existsSync(dist) && fs.mkdirSync(dist)

const dest = path.resolve(dist, "header.ts")
fs.existsSync(dest) && fs.unlinkSync(dest)

let result = '// ==UserScript==\n'
script.name && (result += '// @name'.padEnd(padLen, ' ') + script.name + '\n')
script.namespace && (result += '// @namespace'.padEnd(padLen, ' ') + script.namespace + '\n')
script.version && (result += '// @version'.padEnd(padLen, ' ') + script.version + '\n')
script.author && (result += '// @author'.padEnd(padLen, ' ') + script.author + '\n')
script.description && (result += '// @description '.padEnd(padLen, ' ') + script.description + '\n')

script.homepage && (result += '// @homepage'.padEnd(padLen, ' ') + script.homepage + '\n')
script.icon && (result += '// @icon'.padEnd(padLen, ' ') + script.icon + '\n')
script.icon64 && (result += '// @icon64'.padEnd(padLen, ' ') + script.icon64 + '\n')

script.updateURL && (result += '// @updateURL'.padEnd(padLen, ' ') + script.updateURL + '\n')
script.supportURL && (result += '// @supportURL'.padEnd(padLen, ' ') + script.supportURL + '\n')
script.downloadURL && (result += '// @downloadURL'.padEnd(padLen, ' ') + script.downloadURL + '\n')

if (script.includes) {
    if (typeof script.includes === 'string') result += '// @include'.padEnd(padLen, ' ') + script.includes + '\n'
    else script.includes.forEach((include) => result += '// @include'.padEnd(padLen, ' ') + include + '\n')
}

if (script.matches) {
    if (typeof script.matches === 'string') result += '// @match'.padEnd(padLen, ' ') + script.matches + '\n'
    else script.matches.forEach((m) => result += '// @match'.padEnd(padLen, ' ') + m + '\n')
}

if (script.excludes) {
    if (typeof script.excludes === 'string') result += '// @exclude'.padEnd(padLen, ' ') + script.excludes + '\n'
    else (script.excludes.forEach((exclude) => result += '// @exclude'.padEnd(padLen, ' ') + exclude + '\n'))
}

script.requires && (script.requires.forEach((m) => result += '// @require'.padEnd(padLen, ' ') + m + '\n'))
script.resources && (script.resources.forEach((m) => result += '// @resource '.padEnd(padLen, ' ') + m + '\n'))
script.connect && (result += '// @connect'.padEnd(padLen, ' ') + script.connect + '\n')
script.runAt && (result += '// @run-at'.padEnd(padLen, ' ') + script.runAt + '\n')
if (script.grants) {
    if (typeof script.grants === 'string') result += '// @grant'.padEnd(padLen, ' ') + script.grants + '\n';
    else script.grants.forEach((item) => typeof item === 'string' && (result += '// @grant'.padEnd(padLen, ' ') + item + '\n'))
}

script.noframes && (result += '// @noframes\n')
script.nocompat && (result += '// @nocompat'.padEnd(padLen, ' ') + script.nocompat + '\n')

result += '// ==/UserScript==\n'

fs.writeFileSync(dest, result)

console.log('header: ' + dest)