import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity({ name: "product_images" }) // Para renombrar las tablas
export class ProductImage {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  url: string;

  @ManyToOne( // FORMA DE RELACIONAR LAS TABLAS DEBE DE TENER EL MISMO TIPO EN LAS DOS TABLAS QUE SE VAN A RELACIONAR
    () => Product,
    (product) => product.images,
    { onDelete: 'CASCADE' } // Para que se borre en cascada. Si se borra un producto, se borran las imagenes que tenían relación con ese producto
  )
  product: Product;
}