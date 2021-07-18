const colorType1="bg-gray-100"
const colorType1b="text-gray-500"

const colorType2="bg-red-100"
const colorType2b="text-red-500"

const colorType3="bg-green-100"
const colorType3b="text-green-500"

const colorType4="bg-blue-100"
const colorType4b="text-blue-500"

const colorType5="bg-yellow-100"
const colorType5b="text-yellow-500"

const colorTyp6="bg-pink-100"
const colorType6b="text-pink-500"

export default function Tag(props) {
    return  <a href={`https://www.bitclout.com/u/${props.name}`} target="_blank"
    className={`${props.class} text-xs inline-flex items-center font-bold leading-sm capitalize px-2 py-1 rounded-full bg-${props.tagColor}-100 text-${props.tagColor}-500 `}
  >
    {props.isAt ? "@" : ""}{props.name}
  </a>;
  }
