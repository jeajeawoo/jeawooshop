import { Tab, Tabs } from 'react-bootstrap';
import { TabitemProps, TabmenuProps } from '@/types/type';
import { useTab } from '@/context/tabmenucontext';

// Tabitem 컴포넌트
function Tabitem({ cont }: TabitemProps) {
  return (
    <>
      <ul>
        <a href="#">
          <li>
            <span>{cont.title}</span>
            <span style={{float: 'right'}}>{cont.date}</span>
          </li>
        </a>
      </ul>
      <hr />
    </>
  );
}

// Tabmenu 컴포넌트
function Tabmenu({ Tabitem }: TabmenuProps) {
  const { cont, cont2 } = useTab();  // useTab을 사용하여 cont와 cont2 데이터를 가져옴

  return (
    <div style={{width: '570px'}}>
      <Tabs defaultActiveKey="tab-1" className="mb-3">
        <Tab eventKey="tab-1" title="새소식">
          {cont.map((item, i) => (
            <Tabitem key={i} cont={item} />
          ))}
        </Tab>
        <Tab eventKey="tab-2" title="이벤트">
          {cont2.map((item, i) => (
            <Tabitem key={i} cont={item} />
          ))}
        </Tab>
      </Tabs>
    </div>
  );
}

export { Tabmenu, Tabitem };
