import { useShoes } from '@/context/shoescontext';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const ItemPage = () => {
  const { filteredShoes } = useShoes();
  const [itemList, setItemList] = useState(filteredShoes);

  useEffect(() => {
    setItemList(filteredShoes);
  }, [filteredShoes]);

  return (
    <div>
      <h1>상품 목록</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '16px' }}>
        {itemList.map(item => (
          <div key={item.id} style={{ border: '1px solid #ddd', padding: '16px', borderRadius: '8px' }}>
            <Link href={'/detail/'+item.id}>
              <img
                src={`http://localhost:8080/images/${item.storedFilePath}`}
                alt={item.originalImgName}
                style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
              />
              <h2>{item.title}</h2>
              <p>{item.content}</p>
              <p>가격: {item.price}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemPage;
