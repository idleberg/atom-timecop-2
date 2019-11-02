/** @babel */
/** @jsx etch.dom */

import { Disposable } from 'atom'
import { shell } from 'electron'
import etch from 'etch'

export default class PackagePanelView {
  constructor ({ title }) {
    this.title = title
    etch.initialize(this)

    const clickHandler = (event) => {
      const target = event.target.closest('a.package')
      if (target) {
        const packagePath = atom.packages.resolvePackagePath(target.dataset.package)

        switch (atom.config.get('timecop-2.onClickAction')) {
          case 'editPackage':
            atom.open({ pathsToOpen: [packagePath] })
            break
          case 'revealPackage':
            shell.showItemInFolder(packagePath)
            break
          default:
            atom.workspace.open(`atom://config/packages/${target.dataset.package}`)
            break
        }
      }
    }
    this.element.addEventListener('click', clickHandler)
    this.disposable = new Disposable(() => { this.element.removeEventListener('click', clickHandler) })
  }

  update () {}

  destroy () {
    this.disposable.dispose()
    return etch.destroy(this)
  }

  render () {
    return (
      <div className='tool-panel padded package-panel'>
        <div className='inset-panel'>
          <div className='panel-heading'>{this.title}</div>
          <div className='panel-body padded'>
            <div className='text-info' ref='summary'>Loading…</div>
            <ul className='list-group' ref='list' />
          </div>
        </div>
      </div>
    )
  }

  addPackages (packages, timeKey) {
    for (const pack of packages) {
      this.addPackage(pack, timeKey)
    }
  }

  addPackage (pack, timeKey) {
    const li = document.createElement('div')
    li.classList.add('list-item')

    const a = document.createElement('a')
    a.classList.add('inline-block', 'package')
    a.dataset.package = pack.name
    a.textContent = pack.name
    li.appendChild(a)

    const line = document.createElement('span')
    line.classList.add('timecop-line')
    li.appendChild(line)

    const timeCode = document.createElement('code')
    timeCode.classList.add('inline-block', pack[timeKey] > atom.config.get('timecop-2.upperThreshold') ? 'highlight-error' : 'highlight-warning')
    timeCode.textContent = `${pack[timeKey]}ms`
    li.appendChild(timeCode)

    this.refs.list.appendChild(li)
  }
}
