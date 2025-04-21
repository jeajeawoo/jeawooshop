import { RecentProps, ShoesProps } from "@/types/type"
import Link from "next/link"

function Shoes({shoes,id}:ShoesProps){
  return (
    <div><Link href={'/detail/'+id}>
      <img src={`http://localhost:8080/images/${shoes.storedFilePath}`} width={"50%"} alt='신발사진'/>
      <h4>
        {shoes.title}
      </h4>
      <p>
        {shoes.price}
      </p></Link>
    </div>
  )
}

function Recent({ recent, shoes }: RecentProps) {
  const recentShoe = shoes.find(shoe => shoe.id === recent);
  
  if (!recentShoe) return null;

  return (
    <div>
      <Link href={'/detail/' + recent}>
        <img
          src={`http://localhost:8080/images/${recentShoe.storedFilePath}`}
          width={'200px'}
          alt={`${recentShoe.title} 이미지`}
        />
        <p style={{ textAlign: 'center' }}>{recentShoe.title}</p>
      </Link>
    </div>
  );
}
export {Shoes,Recent};

