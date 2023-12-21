import React from 'react';

export default function AboutUs() {
  return (
    <>
      <div
        class='d-block float-none d-xl-flex flex-fill justify-content-center m-auto justify-content-xl-center'
        style={{ width: '993px' }}
      >
        <div
          class='card text-light text-center d-xl-flex align-items-center align-content-center align-self-center order-5 m-auto'
          style={{
            width: '1822px',
            height: '105px',
            margin: '0px',
            filter: 'blur(0px) brightness(100%) contrast(100%)',
          }}
        >
          <img
            class='img-fluid card-img w-100 d-block d-xl-flex justify-content-xl-center'
            style={{
              filter:
                'blur(0px) brightness(38%) grayscale(27%) hue-rotate(0deg) invert(7%) saturate(101%) sepia(0%)',
              opacity: '1',
            }}
            src='assets/img/shutterstock_2222.jpg'
          />
          <div class='card-img-overlay'>
            <h1
              class='text-uppercase text-center d-xl-flex justify-content-xl-center'
              style={{
                padding: '180px',
                fontFamily: 'Bebas Neue',
                fontSize: '114px',
                color: 'rgb(255,255,255)',
              }}
            >
              ABOUT
            </h1>
            <div>
              <input
                class='form-control-plaintext'
                type='text'
                value='MY BEST LIFE'
                readonly=''
                style={{
                  textAlign: 'center',
                  padding: '66px',
                  fontSize: '42px',
                  color: 'rgb(0,0,0)',
                  fontFamily: 'Bebas Neue',
                  paddingTop: '70px',
                  paddingBottom: '12px',
                }}
              />
            </div>
            <div>
              <div
                class='row'
                style={{ padding: '0px', paddingTop: '27px', margin: '0px' }}
              >
                <div class='col'>
                  <img src='assets/img/ggym.jpg' width='100%' />
                </div>
                <div class='col'>
                  <input
                    class='form-control-plaintext'
                    type='text'
                    value='OUR VISION'
                    readonly=''
                    style={{
                      textAlign: 'center',
                      fontFamily: 'Bebas Neue',
                      fontSize: '55px',
                      color: 'rgb(0,0,0)',
                    }}
                  />
                  <p
                    class='text-center'
                    style={{
                      color: 'rgb(119,119,119)',
                      height: '186px',
                      margin: '14px',
                      padding: '0px',
                      paddingRight: '23px',
                      paddingBottom: '0px',
                      paddingLeft: '23px',
                      textAlign: 'center',
                      fontSize: '19px',
                    }}
                  >
                    <br />
                    To Empower the People in the Emerging / Frontier Nations,
                    who are at the bottom of the pyramid, to realize their Best
                    Life.
                    <br />
                    <br />
                  </p>
                </div>
                <div
                  class='row'
                  style={{ padding: '0px', paddingTop: '27px', margin: '0px' }}
                >
                  <div class='col'>
                    <input
                      class='form-control-plaintext d-xl-flex'
                      type='text'
                      value='OUR MISSION'
                      readonly=''
                      style={{
                        textAlign: 'center',
                        fontFamily: 'Bebas Neue',
                        fontSize: '55px',
                        color: 'rgb(0,0,0)',
                      }}
                    />
                    <p
                      class='text-center d-xl-flex'
                      style={{
                        color: 'rgb(119,119,119)',
                        height: '186px',
                        margin: '14px',
                        padding: '0px',
                        paddingRight: '23px',
                        paddingBottom: '0px',
                        paddingLeft: '23px',
                        textAlign: 'center',
                        fontSize: '19px',
                      }}
                    >
                      <br />
                      To Extend Lives, Restore Good Health and Enhance Physical
                      Fitness Levels of members so as to nurture them to have a
                      Devoted Heart, a Purposeful Soul and a Courageous Mind.
                      <br />
                      <br />
                    </p>
                  </div>
                  <div class='col'>
                    <img
                      src='assets/img/shutterstock_1069150037.jpg'
                      width='100%'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
