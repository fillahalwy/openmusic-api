class Listener {
  constructor(playlistsService, mailSender) {
    this._playlistsService = playlistsService;
    this._mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message, channel) {
    try {
      const { playlistId, targetEmail } = JSON.parse(message.content.toString());

      const playlistData = await this._playlistsService.getSongsFromPlaylist(playlistId);
      
      await this._mailSender.sendEmail(targetEmail, JSON.stringify(playlistData));

      console.log(`Berhasil mengirim email ke: ${targetEmail}`);
      
      channel.ack(message);

      await new Promise((resolve) => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.error('Gagal memproses pesan:', error.message);
      
      channel.nack(message, false, false);
    }
  }
}

module.exports = Listener;