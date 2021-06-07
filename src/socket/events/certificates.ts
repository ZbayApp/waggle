import { EventTypesResponse } from "../constantsReponse"

export const loadCertificates = (socket, certificates: string[]) => {
    console.log(`Sending back ${certificates.length} certificates`)
    socket.emit(EventTypesResponse.RESPONSE_GET_CERTIFICATES, {
      certificates
    })
  }