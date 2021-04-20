import { EventTypesServer } from '../constants'
import { ConnectionsManager } from '../../libp2p/connectionsManager'
import { IChannelInfo } from '../../storage/storage'

export const connections = (io, connectionsManager: ConnectionsManager) => {
  io.on(EventTypesServer.CONNECTION, socket => {
    console.log('websocket connected')
    socket.on(EventTypesServer.SUBSCRIBE_FOR_TOPIC, async (channelData: IChannelInfo) => {
      await connectionsManager.subscribeForTopic(channelData)
    })
    socket.on(EventTypesServer.SEND_MESSAGE, async ({ channelAddress, message }) => {
      await connectionsManager.sendMessage(channelAddress, message)
    })
    socket.on(EventTypesServer.GET_PUBLIC_CHANNELS, async () => {
      await connectionsManager.updateChannels()
    })
    socket.on(EventTypesServer.FETCH_ALL_MESSAGES, async (channelAddress: string) => {
      await connectionsManager.loadAllMessages(channelAddress)
    })
    socket.on(EventTypesServer.ADD_USER, async ({ publicKey, halfKey }) => {
      await connectionsManager.addUser(publicKey, halfKey)
    })
    socket.on(EventTypesServer.GET_AVAILABLE_USERS, async () => {
      await connectionsManager.getAvailableUsers()
    })
    socket.on(EventTypesServer.INITIALIZE_CONVERSATION, async ({ address, encryptedPhrase }) => {
      await connectionsManager.initializeConversation(address, encryptedPhrase)
    })
    socket.on(EventTypesServer.GET_PRIVATE_CONVERSATIONS, async () => {
      await connectionsManager.getPrivateConversations()
    })
    socket.on(EventTypesServer.SEND_DIRECT_MESSAGE, async ({channelAddress, message}) => {
      console.log(`WAGGLE_LISTENER: SEND_DIRECT_MESSAGE(channelAddress): ${channelAddress}`)
      console.log(`WAGGLE_LISTENER: SEND_DIRECT_MESSAGE(message): ${message}`)
      await connectionsManager.sendDirectMessage(channelAddress, message)
    })
    // socket.on(EventTypesServer.FETCH_ALL_DIRECT_MESSAGES, async (channelAddress: string) => {
    //   await connectionsManager.fetchAllDirectMessages(channelAddress, io)
    // })
    socket.on(EventTypesServer.SUBSCRIBE_FOR_DIRECT_MESSAGE_THREAD, async (channelAddress: string) => {
      await connectionsManager.subscribeForDirectMessageThread(channelAddress)
    })
  })
}
