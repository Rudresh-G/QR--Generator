

import QRCode from 'qrcode'
import { ChromePicker } from 'react-color'
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import {useEffect, useState} from 'react'
import {Button, ToggleButton, ToggleButtonGroup} from '@mui/material'


function Qrcode() {
  const [url, setUrl] = useState('www.google.com')
  const [qr, setQr] = useState('')
  const [size, setSize] = useState('540')
  const [codeColor, setCodeColor] = useState('#000000ff')
  const [bgColor, setBgColor] = useState('#ffffffff')
  const [anchorEl_code, setAnchorEl_code] = useState(null)
  const [anchorEl_bg, setAnchorEl_bg] = useState(null)
  const [transparentBG, setTransparency] = useState(false)
  const [format, setFormat] = useState('image/png')

  const open1 = Boolean(anchorEl_code);
  const id1 = open1 ? 'simple-popover' : undefined;
  const open2 = Boolean(anchorEl_bg);
  const id2 = open2 ? 'simple-popover' : undefined;

  
  let params = {
    width: size,
    type: format,
    maskPattern: 1,
    margin: 2,
    color: {
      dark: codeColor,
      light: bgColor,}
  }

  const generateQRCode = () => {
    QRCode.toDataURL(url, params, (err, url) => {
      if (err) return console.err(err)
      //console.log(url)
      setQr(url)
    })
  }

  String.prototype.replaceAt = function(index, replacement) {
    if (index >= this.length) {
      return this.concat(replacement);
    }
    return this.substring(0, index) + replacement;
  }

  const updateTransparency = () =>{
    let newColor = ''
    if(transparentBG) {
      newColor = bgColor.replaceAt(7, '00')
    }
    else {
      newColor = bgColor.replaceAt(7, 'ff')
    }
    setBgColor(newColor)
  }

  useEffect(() => {
    console.log(transparentBG)
    updateTransparency()
    console.log(bgColor)
    generateQRCode()
  }, [size, codeColor, bgColor, anchorEl_code, transparentBG, format])
  
  return (
      <div className='App'>
        
        <Container fixed maxWidth='md' sx={{minHeight: '95vh', padding: 0, display: 'flex', flexDirection: 'column', }}>
          <section id='main'>
            <div className='block' id='url-input-wrapper'>
              <h4>Enter URL/Text</h4><br></br>
              <div id='url-input-field'>
                <input id='url-input' 
                  type='text' 
                  placeholder='eg. www.google.com' 
                  value={url} 
                  onChange={e => setUrl(e.target.value)}/>
                <Button className='button' variant='contained' sx={{backgroundColor:'#2B2D42'}} onClick={generateQRCode}>Generate</Button>
              </div>
            </div>
            {qr && <>
              <div id='qr-editing-wrapper'>
                <div id='qr-code'>
                  <img src={qr} alt='QR-Code' />
                </div>
                <div className='block' id='editing-panel'>
                  <div id='style-label'><h4>Style</h4></div>
                  <div id='controls'>
                    <table>
                      <tr>
                        <td>Code Color</td>
                        <td><Box className='color-box' aria-describedby={id1} sx={{width:50, height:50,'&:hover': {transform: 'scale(1.1, 1.1)', boxShadow: '0px 0px 20px 4px #EF233C33', cursor:'pointer'}}} backgroundColor={codeColor} onClick={(e) => {setAnchorEl_code(e.currentTarget)}} ></Box>
                          <Popover
                            z-index='2'
                            id={id1}
                            open={open1}
                            anchorEl={anchorEl_code}
                            onClose={(e)=> setAnchorEl_code(null)}
                            anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'center',
                            }}
                          >
                            <ChromePicker color={codeColor} onChangeComplete={e => setCodeColor(e.hex)}/>
                          </Popover>
                        </td>
                      </tr>
                      <tr>
                        <td>Background Color</td>
                        <td><Box className='color-box' aria-describedby={id2} sx={{width:50, height:50, '&:hover': {transform: 'scale(1.1, 1.1)', boxShadow: '0px 0px 20px 4px #EF233C33', cursor:'pointer'}}} backgroundColor={bgColor} onClick={(e) => {setAnchorEl_bg(e.currentTarget)}} ></Box>
                          <Popover
                            z-index='2'
                            id={id2}
                            open={open2}
                            anchorEl={anchorEl_bg}
                            onClose={(e)=> setAnchorEl_bg(null)}
                            anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'center',
                            }}
                          >
                            <ChromePicker color={bgColor} onChangeComplete={e => setBgColor(e.hex)}/>
                          </Popover>
                        </td>
                      </tr>
                      <tr>
                        <td>Transparent Background</td>
                        <td>
                          <Switch
                            checked={transparentBG}
                            onChange={(e) => setTransparency(e.target.checked)}
                            inputProps={{ 'aria-label': 'controlled' }}
                          />
                        </td>
                      </tr>
                    </table>
                    <span className='headings'>Select image format</span><br></br>
                    <div id='format-options'>
                      <ToggleButtonGroup sx={{padding:2}}
                        color='secondary'
                        value={format}
                        exclusive
                        onChange={e => setFormat(e.target.value)}>
                        <ToggleButton value="image/png">PNG</ToggleButton>
                        <ToggleButton value="image/jpeg">JPEG</ToggleButton>
                        <ToggleButton value="image/webp">WEBP</ToggleButton>
                      </ToggleButtonGroup>
                    </div>
                  </div>
                </div>
              </div>
              <div className='block' id='download-options-wrapper'>
                <h4>Select Size</h4><br></br>
                <div id='download-options'>
                  <ToggleButtonGroup sx={{margin:0, display: 'flex', justifyContent:'center'}}
                    color='secondary'
                    value={size}
                    exclusive
                    onChange={e => setSize(e.target.value)}>
                    <ToggleButton value="128">128</ToggleButton>
                    <ToggleButton value="256">256</ToggleButton>
                    <ToggleButton value="512">512</ToggleButton>
                    <ToggleButton value="720">720</ToggleButton>
                    <ToggleButton value="1024">1024</ToggleButton>
                  </ToggleButtonGroup>
                  <Button className='button' variant='contained' color='success' href={qr} download="qrcode" >Download</Button>
                </div>
              </div>            
            </>}
            </section>       
          
        </Container>
         <footer>
           <p>&#169; 2022 Rudresh</p>
         </footer>
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
      <div className='App'>
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