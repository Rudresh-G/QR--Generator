

import QRCode from 'qrcode'
import {useEffect, useState} from 'react'
import {Button, ToggleButton, ToggleButtonGroup} from '@mui/material'


function Qrcode() {
  const [url, setUrl] = useState('www.google.com')
  const [qr, setQr] = useState('')
  const [size, setSize] = useState('540')
  
  const generateQRCode = () => {
    QRCode.toDataURL(url, {
      width: size,
      maskPattern: 1,
      margin: 2,
      color: {
        dark: '#224444FF',
        light: '#EFEFEFFF',}
    }, (err, url) => {
      if (err) return console.err(err)
      console.log(url)
      setQr(url)
    })
  }
  useEffect(() => {
    generateQRCode()
  }, [size])
  
  return (
      <div class='App'>
        <h1>QR Code Generator</h1>
        <input id='url-input' 
          type='text' 
          placeholder='eg. www.google.com' 
          value={url} 
          onChange={e => setUrl(e.target.value)}/>
        <Button variant='contained' onClick={generateQRCode}>Generate</Button>
        {qr && <>
          <img src={qr} alt='QR-Code' />
          <ToggleButtonGroup
            color='primary'
            value={size}
            exclusive
            onChange={e => setSize(e.target.value)}
          >
            <ToggleButton class="controls" value="128">128</ToggleButton>
            <ToggleButton class="controls" value="480">480</ToggleButton>
            <ToggleButton class="controls" value="720">720</ToggleButton>
          </ToggleButtonGroup>
          <Button variant='contained' color='success' href={qr} download="qrcode.png" >Download</Button>
         </>}
      </div>  
  )
}

export default Qrcode

/*
// Alternative Way- Using Promises, Aync-Await in a class component
import QRCode from 'qrcode'
import React, {Component} from 'react'
import {Button} from '@mui/material'

export default class Qrcode extends Component {
  constructor(props) {
    super(props)
    this.state = {
      url: '',
      qr: ''
    }
  }
  handleClick = () => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => resolve(document.getElementById('url-input').value), 500)
    })
    const readUrl = async () => {
      const response = await promise
      this.setState({url: response})
    }
    readUrl()
  }

  generateQRCode = () => {
    QRCode.toDataURL(this.state.url, {
      width: 800,
      margin: 2,
      color: {
        dark: '#224444FF',
        light: '#EFEFEFFF'}
    }).then(qrurl => {this.setState({qr: qrurl})})
    .catch(err => {console.error(err)})
  }

  render() {
    return (
      <div class='App'>
        <h1>QR Code Generator</h1>
        <input id='url-input' 
          type='text' 
          placeholder='eg. www.google.com' 
          value={this.url} 
          onChange={this.handleClick}/>
        <Button variant='contained' onClick={this.generateQRCode}>Generate</Button>
        {this.state.qr && <>
          <img id='qr-code' src={this.state.qr} alt='QR-Code' />

          <Button variant='contained' color='success' href={this.state.qr} download="qrcode.png" >Download</Button>
         </>}
      </div>  
  )
  }
}
*/