import { motion, useScroll, useTransform } from 'framer-motion'

function TitleCard({name, price, change, date, model} : {name: String, price: Number, change: Number, date: Date, model: String}) {
    return (
        <motion.div className="w-200 h-100 bg-black ">
            <p>
                Hello
            </p>
        </motion.div>
    )
}

export default TitleCard