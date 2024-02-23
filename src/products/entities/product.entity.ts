import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductImage } from "./product-image.entity";
import { User } from "src/auth/entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: "products" }) // Para renombrar las tablas
export class Product { // El ENTITY sería una tabla

  @ApiProperty({
    example: '71ae6947-6a4e-40c1-b0c4-4f6e345340d4',
    description: 'Product ID',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'T-Shirt Teslo',
    description: 'Product Title',
    uniqueItems: true,
  })
  @Column('text', { unique: true })
  title: string;

  @ApiProperty({
    example: 0,
    description: 'Product Price',
  })
  @Column('float', { default: 0 })
  price: number;

  @ApiProperty({
    example: 'Id duis esse laboris ex eiusmod ullamco ad velit est.',
    description: 'Product Description',
    default: null,
  })
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty({
    example: 't_shirt_teslo',
    description: 'Product Slug - for SEO',
    uniqueItems: true,
  })
  @Column('text', { unique: true })
  slug: string;

  @ApiProperty({
    example: 10,
    description: 'Product Stock',
    default: 0,
  })
  @Column('int', { default: 0 })
  stock: number;

  @ApiProperty({
    example: ['M', 'XL', 'XXL'],
    description: 'Product Sizes'
  })
  @Column('text', { array: true })
  sizes: string[];

  @ApiProperty({
    example: 'men',
    description: 'Product Gender'
  })
  @Column('text')
  gender: string;


  @ApiProperty()
  @Column('text', { array: true, default: [] })
  tags: string[];

  @ApiProperty()
  @OneToMany( // FORMA DE RELACIONAR LAS TABLAS
    () => ProductImage,
    (productImage) => productImage.product,
    { cascade: true, eager: true }
  )
  images?: ProductImage[];

  @ManyToOne(
    () => User,
    (user) => user.product,
    { eager: true }
  )
  user: User;

  @BeforeInsert() // Para comprobar/hacer los datos antes de que se guarden en la base de datos.
  checkSlugInsert() {
    if( !this.slug ) {
      this.slug = this.title;
    }
    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", "");
  }

  @BeforeUpdate() // Para comprobar/hacer los datos después de que se guardaron en la base de datos y se quiere actualizar.
  checkSlugUpdate() {
    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", "");
  }

}
