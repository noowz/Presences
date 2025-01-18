import type { GamePresence } from '..'
import {
  getActivePlayerId,
  getCurrentGameState,
  getCurrentGameStateType,
  getPlayerAvatar,
  getPlayerData,
  getPlayerScore,
  getUserPlayerId,
} from '../../util'

const starfluxx: GamePresence = {
  logo: 'https://cdn.rcd.gg/PreMiD/websites/B/Board%20Game%20Arena/assets/517.png',
  async getData(presence: Presence) {
    const gameState = await getCurrentGameState(presence)
    const activePlayer = await getActivePlayerId(presence)
    const gameStateType = await getCurrentGameStateType(presence)
    const userPlayer = await getUserPlayerId(presence)
    const activePlayerData = await getPlayerData(presence, activePlayer)
    const data: PresenceData = {
      smallImageKey: getPlayerAvatar(userPlayer),
      smallImageText: `Score: ${getPlayerScore(userPlayer)}`,
    }
    if (activePlayer === userPlayer || gameStateType !== 'activeplayer') {
      switch (gameState) {
        case 'playCard':
          data.state = 'Playing cards'
          break
        case 'enforceHandLimitForOthers':
        case 'enforceHandLimitForSelf':
          data.state = 'Discarding cards'
          break
        case 'enforceKeepersLimitForOthers':
        case 'enforceKeepersLimitForSelf':
          data.state = 'Discarding keepers'
          break
        case 'goalCleaning':
          data.state = 'Discarding a goal'
          break
        case 'actionResolve':
        case 'actionResolveForOther':
          data.state = 'Resolving an action'
          break
        case 'freeRuleResolve':
          data.state = 'Resolving a free rule'
          break
        case 'creeperResolveTurnStart':
        case 'creeperResolveInPlay':
          data.state = 'Resolving a creeper'
          break
        case 'tempHandPlay':
          data.state = 'Playing a card from their hand'
          break
        case 'surpriseCounterPlay':
          data.state = 'Playing a surprise counter'
          break
        case 'surpriseCancelSurprise':
          data.state = 'Cancelling a surprise'
          break
        case 'gameEnd':
          data.state = 'Viewing game results'
          break
      }
    }
    else {
      data.state = `Waiting for ${activePlayerData.name}`
    }
    return data
  },
}
export default starfluxx
