import { useState } from 'react'
import { Badge, Button } from "react-bootstrap";
import { mutate } from "swr";

import { good } from "../../utils/postApi";
import { AsyncStatus} from '../../utils/constants';

const GoodButton=({pno, goodCnt})=>{
  const [status, setStatus] = useState(AsyncStatus.IDLE);

  const doGood=async ()=>{
    if(status===AsyncStatus.SUBMITTING) return;
    setStatus(AsyncStatus.SUBMITTING);

    try {
      const response = await good(pno);
      mutate(['pno', pno], (prevData) => {
        if (!prevData)  
          return prevData;
        return {...prevData, goodCnt: response.data };
      }, false);
      setStatus(AsyncStatus.SUCCESS);
    } catch(err) {
      setStatus(AsyncStatus.FAIL);
    }
  }

  return (
    <Button variant="primary" onClick={doGood} disabled={status===AsyncStatus.SUBMITTING}>
      추천<Badge bg="secondary">{goodCnt}</Badge>
    </Button>
  )
};

export default GoodButton;
