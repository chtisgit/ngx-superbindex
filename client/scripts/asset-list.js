import CustomElement from './custom-element'

export default class AssetList extends CustomElement(HTMLOListElement) {
    static tagName = 'asset-list'
    static tagType = 'ol'

    highlightedGraphemes = ''
    keystroke = this.keystroke.bind(this)

    highlight(key, code) {
        switch (code) {
        case 'Backspace':
            if (this.highlightedGraphemes === '') {
                this.highlightedGraphemes = '..'
                break
            }
            this.highlightedGraphemes = this.highlightedGraphemes.substr(0, this.highlightedGraphemes.length-1)
            break
        case 'Escape':
            this.highlightedGraphemes = ''
            break
        default:
            this.highlightedGraphemes += key.toLocaleLowerCase()
        }

        let firstHighlightedAssetItem

        for (const assetItem of this.children) {
            assetItem.highlight(this.highlightedGraphemes)

            if (firstHighlightedAssetItem === undefined && assetItem.highlighted) {
                firstHighlightedAssetItem = assetItem
            }
        }

        if (firstHighlightedAssetItem === undefined) {
            if (this.highlightedGraphemes !== '') {
                this.highlight(null, 'Backspace')
            }

            return
        }

        firstHighlightedAssetItem.focus()
        firstHighlightedAssetItem.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest'
        })
    }

    mount() {
        document.body.addEventListener('keyup', this.keystroke)
    }

    keystroke({ key, code, ctrlKey, altKey, metaKey}) {
        if (ctrlKey || altKey || metaKey) {
            return
        }

        switch(code) {
        case 'Escape':
        case 'Backspace':
            this.highlight(null, code)
            return
        default:
            break
        }

        const notGrapheme = key.length !== 1;

        if (notGrapheme) {
            return
        }

        this.highlight(key)
    }
}
