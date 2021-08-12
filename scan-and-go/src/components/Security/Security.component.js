import React, { useEffect, useState } from 'react';

const enc = new TextEncoder();

const strToBin = (str) => Uint8Array.from(atob(str), c => c.charCodeAt(0));

const binToStr = (bin) => btoa(new Uint8Array(bin).reduce((s, byte) => s + String.fromCharCode(byte), ''));

const registerCredential = async function() {
  const publicKey = {
    challenge: enc.encode('wow!verysecurerandomchallenge!goodjob'),
    rp: {
      name: 'The Relying Party'
    },
    user: {
      id: enc.encode('sxw27iq'),
      name: 'Stephanie Wilbur',
      displayName: 'Steph'
    },
    authenticatorSelection: {
      userVerification: "preferred"
    },
    attestation: 'direct',
    pubKeyCredParams: [
      {
        type: "public-key", alg: -7
      }
    ]
  }

  const res = await navigator.credentials.create({
    publicKey: publicKey
  })

  console.log(res);
  localStorage.setItem('rawId', binToStr(res.rawId));
}

export const validateCredential = async function(callback){
  const rawId = localStorage.getItem('rawId');
  const AUTH_CHALLENGE = 'wow!verysecurerandomchallenge!goodjob';
  const publicKey = {
    rpId: "localhost",
    challenge: enc.encode(AUTH_CHALLENGE),
    allowCredentials: [{
      id: strToBin(rawId),
      type: 'public-key'
    }],
    authenticatorSelection: {
      userVerification: "preferred"
    },
  };

  const res = await navigator.credentials.get({
    publicKey: publicKey
  })

  console.log(res);

  const extractedData = {
    id: res.id,
    rawId: binToStr(res.rawId),
    clientDataJSON: binToStr(res.response.clientDataJSON)
  }

  const dataFromClient = JSON.parse(atob(extractedData.clientDataJSON));
  const retrievedChallenge = atob(dataFromClient.challenge);
  if (callback && retrievedChallenge === AUTH_CHALLENGE){
    callback();
  }
}

export function Security() {

  registerCredential();

  return (
    <div className='col__12-12 securityPage'>
      <div className='row-header'>
        <div className='row-header__text'>
          <div className='u--marginXsmall-bottom'>
            Establish Your Identity
          </div>
        </div>
      </div>
    </div>
  )
}

export default Security;