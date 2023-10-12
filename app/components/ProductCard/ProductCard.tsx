import AddToCart from "../AddToCart"
import styles from './ProductCard.module.css'



const ProductCard = () => {
  return (
    // <div className= {styles.card}>
    // <div className= 'p-5 my-5 bg-green-400 text-white text-xl hover:bg-green-500 rounded-sm'>
    <div >
        <AddToCart />
    </div>
  )
}

export default ProductCard