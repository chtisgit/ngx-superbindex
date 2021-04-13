import CustomElement from './custom-element'

export default class AssetLink extends CustomElement(HTMLAnchorElement) {
    static tagName = 'asset-link'
    static tagType = 'a'

    highlighted = false

    makeRegex(str) {
        const escape = ['.', '(', ')', '[', ']', '{', '}', '+']
        for (const ch of escape) {
            str = str.replaceAll(ch, '\\'+ch)
        }
        return '('+str+')'
    }

    highlight(highlightedGraphemes) {
        const regExp = new RegExp(this.makeRegex(highlightedGraphemes), 'iu')

        this.highlighted = highlightedGraphemes !== '' && regExp.test(decodeURIComponent(this.url))

        if (this.highlighted) {
            const template = '<mark class="asset-mark">$1</mark>'

            this.innerHTML = decodeURIComponent(this.url).replace(regExp, template)
        } else {
            this.textContent = decodeURIComponent(this.url)
        }

        this.classList.toggle('asset-link--highlighted', this.highlighted)
    }

    get type() {
        if (this.classList.contains('asset-link--directory')) {
            return 'directory'
        }

        if (this.classList.contains('asset-link--file')) {
            return 'file'
        }

        return ''
    }

    get url() {
        return this.getAttribute('href')
    }
}
