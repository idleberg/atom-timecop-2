const { CompositeDisposable } = require('atom')

let Timecop2View = null
const ViewURI = 'atom://timecop-2'

module.exports = {
  config: {
    lowerThreshold: {
      title: 'Lower Threshold',
      description: 'Specifies the threshold of packages that are included in the view',
      type: 'integer',
      default: 5,
      minimum: 0,
      order: 1
    },
    upperThreshold: {
      title: 'Upper Threshold',
      description: 'Specifies the threshold from which on a package is considered slow',
      type: 'integer',
      default: 25,
      minimum: 5,
      order: 2
    },
    onClickAction: {
      title: 'Onclick Action',
      description: 'Defines the action when clicking on a package in the Timecop 2 view',
      type: 'string',
      default: 'openPackage',
      enum: [
        {
          value: 'openPackage',
          description: 'Opens view for package'
        },
        {
          value: 'editPackage',
          description: 'Opens package in editor'
        },
        {
          value: 'revealsFolder',
          description: 'Reveals package folder'
        }
      ],
      order: 3
    },
    muteTimecopWarning: {
      title: 'Mute Timecop Warning',
      description: 'Disables the startup dialog, whether the user wants to disable the bundled `timecop` core package',
      type: 'boolean',
      default: false,
      order: 4
    }
  },

  async activate () {
    this.subscriptions = new CompositeDisposable()
    this.subscriptions.add(atom.workspace.addOpener(filePath => {
      if (filePath === ViewURI) return this.createTimecopView({ uri: ViewURI })
    }))

    this.subscriptions.add(atom.commands.add('atom-workspace', 'timecop-2:view', () => atom.workspace.open(ViewURI)))

    if (atom.config.get('timecop-2.muteTimecopWarning') === false && !atom.packages.isPackageDisabled('timecop')
    ) {
      this.disableTimecop()
    }
  },

  deactivate () {
    this.subscriptions.dispose()
  },

  disableTimecop () {
    const notification = atom.notifications.addWarning(
      'You are currently using two versions of the `timecop` package. Do you want to disable the bundled core package?', {
        dismissable: true,
        buttons: [
          {
            text: 'Disable Package',
            className: 'icon icon-playback-pause',
            onDidClick () {
              atom.packages.disablePackage('timecop')
              return notification.dismiss()
            }
          },
          {
            text: 'Don\'t Ask Again',
            onDidClick () {
              atom.config.set('timecop-2.muteTimecopWarning', true)
              return notification.dismiss()
            }
          }
        ]
      }
    )
  },

  createTimecopView (state) {
    if (Timecop2View == null) Timecop2View = require('./timecop-view')
    return new Timecop2View(state)
  }
}
