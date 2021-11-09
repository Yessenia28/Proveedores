import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Proveedores,
  Productos,
} from '../models';
import {ProveedoresRepository} from '../repositories';

export class ProveedoresProductosController {
  constructor(
    @repository(ProveedoresRepository) protected proveedoresRepository: ProveedoresRepository,
  ) { }

  @get('/proveedores/{id}/productos', {
    responses: {
      '200': {
        description: 'Proveedores has one Productos',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Productos),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Productos>,
  ): Promise<Productos> {
    return this.proveedoresRepository.productos(id).get(filter);
  }

  @post('/proveedores/{id}/productos', {
    responses: {
      '200': {
        description: 'Proveedores model instance',
        content: {'application/json': {schema: getModelSchemaRef(Productos)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Proveedores.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Productos, {
            title: 'NewProductosInProveedores',
            exclude: ['id'],
            optional: ['proveedoresId']
          }),
        },
      },
    }) productos: Omit<Productos, 'id'>,
  ): Promise<Productos> {
    return this.proveedoresRepository.productos(id).create(productos);
  }

  @patch('/proveedores/{id}/productos', {
    responses: {
      '200': {
        description: 'Proveedores.Productos PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Productos, {partial: true}),
        },
      },
    })
    productos: Partial<Productos>,
    @param.query.object('where', getWhereSchemaFor(Productos)) where?: Where<Productos>,
  ): Promise<Count> {
    return this.proveedoresRepository.productos(id).patch(productos, where);
  }

  @del('/proveedores/{id}/productos', {
    responses: {
      '200': {
        description: 'Proveedores.Productos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Productos)) where?: Where<Productos>,
  ): Promise<Count> {
    return this.proveedoresRepository.productos(id).delete(where);
  }
}
