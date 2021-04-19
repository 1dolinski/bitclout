export default function Tag(props) {
    return   <a href={`https://www.bitclout.com/u/${props.name}`} target="_blank"
    class={`text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-${props.color}-100 text-${props.color}-500 rounded-full`}
  >
    {props.isAt ? "@" : ""}{props.name}
  </a>;
  }
