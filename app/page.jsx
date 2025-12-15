import Link from "next/link";

export default function Home() {
  return (
    <div className="hero">
      <h2 className="citation">"You must take your opponent into a deep
        dark forest where 2+2=5, and the path
        leading out is only wide enough for one"
        <br />
        <i>-Mikhail Tal</i>
        <br />
        <br />
        <Link className="link" href="/blogs">Dive into the forest</Link>
        </h2>
       
    </div>
  );
}
