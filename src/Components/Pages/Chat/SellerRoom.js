
import { Link, useParams } from 'react-router-dom';
import ChatRoom from "./ChatRoom";
const SellerRoom = () => {

  const { sellerId } = useParams();
  const { product } = useParams();
  const { currentId } = useParams();

  return (
    <>
      <ChatRoom sellerId={sellerId} currentId={currentId} productId={product} currentName={"flag"} />
    </>
  );
}

export default SellerRoom