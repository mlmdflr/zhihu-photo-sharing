const htmlToImage = require('html-to-image');

(async () =>
    {
        try {
            const mainDom = document.querySelector('div.QuestionAnswer-content') as HTMLElement
            const titleDom = document.querySelector('.QuestionHeader-title')
            if (mainDom && titleDom){
                const newTitleDom = titleDom.cloneNode()
                newTitleDom.textContent = titleDom.textContent
                const mainDomDiv = mainDom.querySelector('div')
                mainDom.insertBefore(newTitleDom,mainDomDiv)
                const url =await  htmlToImage.toPng(mainDom,{
                    backgroundColor: document.querySelector('html')?.getAttribute('data-darkreader-scheme')==='dark'?'#222':'#d2d0cc'
                })
                let tempLink = document.createElement('a');
                tempLink.style.display = 'none';
                tempLink.href = url;
                tempLink.setAttribute('download', titleDom.textContent as string);
                if (typeof tempLink.download === 'undefined') {
                    tempLink.setAttribute('target', '_blank');
                }
                document.body.appendChild(tempLink);
                tempLink.click();
                setTimeout(function() {
                    document.body.removeChild(tempLink);
                }, 200)
            }
        }catch (error){
            console.error(`zhihu-photo-sharing error : ${error}`)
        }
    }
)()