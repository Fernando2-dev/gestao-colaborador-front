import Link from "next/link"


interface Titulo {
  texto: string;
  link: string;
}
const Titulo: React.FC<Titulo> = ({ texto, link }) => {
  return (
    <div className="flex justify-around pt-2 items-center">
      <h1 className="font-bold text-base">{texto}</h1>
      <button type="button" className="rounded-lg px-4 py-2 text-sm font-semibold shadow-sm border border-zinc-300 text-zinc-700 hover:bg-zinc-50">
        <Link href={link} className="no-underline">Voltar</Link>
      </button>
    </div>
  )
}
export default Titulo

