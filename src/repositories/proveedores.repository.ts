import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbdatasourceDataSource} from '../datasources';
import {Proveedores, ProveedoresRelations, Productos} from '../models';
import {ProductosRepository} from './productos.repository';

export class ProveedoresRepository extends DefaultCrudRepository<
  Proveedores,
  typeof Proveedores.prototype.id,
  ProveedoresRelations
> {

  public readonly productos: HasOneRepositoryFactory<Productos, typeof Proveedores.prototype.id>;

  constructor(
    @inject('datasources.mongodbdatasource') dataSource: MongodbdatasourceDataSource, @repository.getter('ProductosRepository') protected productosRepositoryGetter: Getter<ProductosRepository>,
  ) {
    super(Proveedores, dataSource);
    this.productos = this.createHasOneRepositoryFactoryFor('productos', productosRepositoryGetter);
    this.registerInclusionResolver('productos', this.productos.inclusionResolver);
  }
}
