import QRCode from 'qrcode'
import {useState} from 'react'
import {Button} from '@mui/material'

function Qrcode() {
  const [url, setUrl] = useState('')
  const [qr, setQr] = useState('')
  const generateQRCode = () => {
    QRCode.toDataURL(url, {
      width: 800,
      margin: 2,
      colorDark: '#224444FF',
      colorLight: '#AAAAAAFF',
    }, (err, url) => {
      if (err) return console.err(err)
      console.log(url)
      setQr(url)
    })
  }
  return (
      <div class='App'>
        <h1>QR Code Generator</h1>
        <input id='text' 
          type='text' 
          placeholder='eg. www.google.com' 
          value={url} 
          onChange={e => setUrl(e.target.value)}/>
        <Button variant='contained' onClick={generateQRCode}>Generate</Button>
        {qr && <>
          <img src={qr}
          <Button variant='contained' color='success' href={qr} download="qrcode.png"
        </>}
  )
}
export default Qrcode