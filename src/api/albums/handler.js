const autoBind = require('auto-bind');

class AlbumsHandler{
    constructor(service, validator){
        this._service = service;
        this._validator = validator;

        autoBind(this);
    }
    
    async postAlbumHandler(request, h){
        this._validator.validateAlbumPayload(request.payload);
        const {name, year} = request.payload;

        const albumId = await this._service.addAlbum({name, year});

        const response = h.response({
            status: 'success',
            message: 'Album berhasil ditambah!',
            data: {
                albumId,
            }
        });
        response.code(201);
        return response;
    }

    async getAlbumsByIdHandler(request, h){
        const { id } = request.params;
        const album = await this._service.getAlbumsById(id);
        return{
            status: 'success',
            data: {
                album,
            },
        };
    }

    async putAlbumsByIdHandler(request, h){
        this._validator.validateAlbumPayload(request.payload);
        const { id } = request.params;
        await this._service.editAlbumsById(id);
        return{
            status: 'success',
            message: 'Album berhasil diubah!',
        };
    }

    async deleteAlbumsByIdHandler(request, h){
        const { id } = request.params;
        await this._service.deleteAlbumsById(id);
        return{
            status: 'success',
            message: 'Album berhasil dihapus!',
        };
    }
}

module.exports = AlbumsHandler;