const presence = new Presence({
  clientId: '895742751944089600',
})
const browsingTimestamp = Math.floor(Date.now() / 1000)

presence.on('UpdateData', async () => {
  const presenceData: PresenceData = {
    largeImageKey: 'https://cdn.rcd.gg/PreMiD/websites/S/Stadia/assets/logo.png',
    startTimestamp: browsingTimestamp,
  }

  if (document.location.pathname.includes('home')) {
    presenceData.details = 'Viewing Stadia Home'
    const userName = document.querySelector('span.VY8blf.fSorq')
    presenceData.smallImageText = userName?.textContent
  }
  else if (document.location.pathname.includes('/player')) {
    const gameName = document.querySelector('div.HDKZKb.LiQ6Hb')
    presenceData.details = gameName?.textContent
  }
  else if (document.location.pathname.includes('/store/details')) {
    const storeName = document.querySelector('div.UG7HXc')
    const gamePrice = document.querySelector('span.rdAlw')
    presenceData.details = `Viewing ${storeName?.textContent}`
    presenceData.state = `${gamePrice?.textContent} on the Stadia Store`
  }
  else if (document.location.pathname.includes('/store')) {
    presenceData.details = 'Viewing Stadia Store'
  }
  else if (document.location.pathname.includes('/pro')) {
    presenceData.details = 'Viewing Stadia Pro'
  }
  else {
    presenceData.details = 'Can\'t read page'
  }

  if (presenceData.details)
    presence.setActivity(presenceData)
  else presence.setActivity()
})
