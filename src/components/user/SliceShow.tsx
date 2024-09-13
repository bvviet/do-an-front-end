import Slider from "react-slick";

function SliceShow() {
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const sliceArray = [
    {
      id: 1,
      src: "https://s3-alpha-sig.figma.com/img/9127/7364/ba8121e2c29e56ffdee34397f4d5c1b4?Expires=1727049600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=P5RQHwoyKI~KSSLLtfSS54Af7DslscvMN55kEki0UUBYejzuvVRGA-yHoFldGDLf2qxucJiUcgAX0N8CSashFtpCIZPVq~tEMwPk0nBTuvVKsJUFeouYx4WSsmzk1y96UPojTNGTbrCvfLZyGNyh2czhOGnfvfkWZGz61MJHYnMTaZ1t3Q0Li9ZxJelTJAtB5e1EafSo9Rj85TvSR~hBwwyhPS~QBzRWQZZhA0x~OlOQMaAfbvLAA5Xy0N6Ws~xNRn5LSHPMXcTTXIHmOwf9zouzRctSznfdEn38xDy~PZYe7i6A-H-SXaH7N-AYJw-GYv~myGFpEL3hswqD6CTD~Q__",
    },
    {
      id: 2,
      src: "https://s3-alpha-sig.figma.com/img/3709/77cb/1bd5f3b052860c2e227a7cb913403323?Expires=1727049600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LRU~E2t~q6DkuETeSIfm~I8uowSHrU3E7Hip63ZeoLqzeR08-JcSvIU9ZyGI~ggHq56vXQp1RC09FC2nrLKSuQ7EWdl77BhlKeczrAzv1SMuxra3B-i5RhFPQBuHMaFUT50pzYiIFG5CMOKBIG9Evin5FuoqAo4ww~GwQds~tPkr4tWrP-195zF9VNEyUq9yK~eODx~ZKqDRjwdlMRjXA2IeVzp2umZl9YW9nkZSjUEGu1iLg2jAuar4L7RMFA0k1O85TTyQ2ibDHEWBtxUtrmHwHZOc0SFDQ9tY7qPAThrtk9liz7d3X-ED6j4Un-NX61PxcOmPvSfaFTw2oPnYjw__",
    },
    {
      id: 3,
      src: "https://s3-alpha-sig.figma.com/img/82e7/1ea4/7f329be0752dc246bbd29470e30b9713?Expires=1727049600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=A0G8XViWga-AM~3epenh73VmC0TGYn6pC7ajCYn4OhYClsUvZiokCfuIQkkk8~BeSUI6edbtewk1DTFYDN5pdYJMqWoqqJ41Qpq~pEgIeNtywEXLddjHx~POhmpMgGmqsETe3PDGPo9TOHx-K6x-XZod2Q-XfY7-dqxVN1kC7T1jE~VtcGcgA0adL~svoesy4gaKxsryxNJFBdMlXLOR5sq8GLwg2qQhu1ndYoJKzjW8IA6dM0t3daqFqdrzyu3Sbjy4tmBdGMqhVpI-Lxb0nWg4-I~UOfR4arjXZNzuKLUCoVV6nwfrBdSxYW53Nql5-mx6auB9NlynRu4fCUqKww__",
    },
    {
      id: 4,
      src: "https://s3-alpha-sig.figma.com/img/050c/d101/2104bc0da08572f30dc67d72bdee1780?Expires=1727049600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=iJ62MVxZS-hybr6hv3npCBoG1vN3PDO5Ovw1HdNVEY7EBliekslMNWoOC2BIfbwExQQVt6ZBwRq6wp60yYOkmHV4r4oiSOTQ~t7OZiT~X5NhBoZgcaLkd7jdj4SrF43-iD6Qt1rlfUu0RUxyS-ZN2fDhurpS71ePwDbJeH7ZrxokY~3Qf0yFFmMg7qEHU05zGPLKlB9JMqpnd1-e0QiiT6izHELmfhQegW21oqUFDpMF7IcsOAZ2DoNPXb68vvFBdBaw5~NVZMpvm9E5~lkKtd7~dUMhmCFo0S5S8GaNJbezG~rYgkcfnaC-VlYaEBBQgT3QP5QTM5tJSzLhbJoCyg__",
    },
    {
      id: 5,
      src: "https://s3-alpha-sig.figma.com/img/89fe/ec11/6580fcc93111b6a5320c6f0487e25d8e?Expires=1727049600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=CEDEyQNLCQ47hzDy86w0f9Cj3i3PYJQ~I1gBZDDO7d8prMLjYjiOPNHV2beMJnpvQIlPrd2y4R4AcIFTwqyHVc1lYU1cTtAwVl~1Qw21B63ZMZZeDLHZ7frTyekQLp4M-pHIXgpAsH9NwVK~HnVpPwegqpEzkWDVcwZqkuqUvhQOzjvCZiUTgQ43zuZTojl89Ut8mc4PToznsKQloqxMQ5XOPeCdwdF7H1MWd4K2Ey96H8SVFMIMHkzvlxKA5BhhYOGEv8EzdnhtZnQMDJ8b-es4apYkn67MXosoCr2LVBCNAVFiCroUOz7ke8Rv48QMPcKAd0MJmyVwzgwwwiu9fg__",
    },
  ];
  return (
    <div className="slider-container ml-auto mr-auto w-[89%]">
      <Slider {...settings}>
        {sliceArray.map((item) => (
          <div className="relative h-[180px] cursor-pointer sm:h-[500px]">
            <img
              className="h-full w-full rounded-[25px]"
              src={item.src}
              alt=""
            />
            <div className="z-2 absolute top-0 flex object-cover"></div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default SliceShow;
