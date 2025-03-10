![BearBnB_logo](https://github.com/user-attachments/assets/6e2b7eb7-527a-4e61-aab0-847eb9d12904 | width=200)# BearBnB

An AirBnB clone for bears to demonstrate Dream and Psychic

![U<?xml version="1.0" encoding="UTF-8"?>
<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 465.3259 482.7871">
  <defs>
    <style>
      .cls-1 {
        fill: none;
        stroke: #ff7b00;
        stroke-miterlimit: 10;
        stroke-width: 20px;
      }

      .cls-2 {
        fill: #ff7b00;
      }
    </style>
  </defs>
  <g>
    <path class="cls-2" d="M128.5734,255.2754c3.2601-15.1985,19.8721-26.8,37.104-25.9125,17.2319.8875,14.1426,14.3128,10.8825,29.5113-3.2601,15.1985-5.4563,26.4149-22.6882,25.5275-17.2319-.8875-28.5583-13.9277-25.2983-29.1263Z"/>
    <path class="cls-2" d="M336.7525,255.2754c-3.2601-15.1985-19.8721-26.8-37.104-25.9125-17.2319.8875-14.1426,14.3128-10.8825,29.5113,3.2601,15.1985,5.4563,26.4149,22.6882,25.5275,17.2319-.8875,28.5583-13.9277,25.2983-29.1263Z"/>
  </g>
  <path class="cls-2" d="M232.6629,389.6871c12.3265,0,13.8171-9.0611,20.7317-18.1799,4.8168-6.3523,17.1352-11.1002,17.1352-19.687,0-20.9133-16.9536-19.0311-37.8669-19.0311-20.9133,0-37.8669-1.8822-37.8669,19.0311,0,8.5868,12.3184,13.3348,17.1352,19.687,6.9146,9.1188,8.4052,18.1799,20.7317,18.1799Z"/>
  <path class="cls-1" d="M232.663,113.6618c22.7826,0,57.9573-17.8694,116.7908.6545,34.2626,10.7876,65.9193,6.4495,87.4074-26.9508,40.4269-62.8382-50.6969-112.1181-79.7599-45.7916-40.8509,93.2282,55.7235,97.495,89.8464,168.3,28.8672,59.8994-19.2328,156.3046-107.8415,207.6621-58.8732,34.1229-68.5763,55.2511-106.4433,55.2511-37.8669,0-47.5701-21.1282-106.4433-55.2511C37.611,366.1784-10.489,269.7733,18.3782,209.8738c34.1229-70.805,130.6973-75.0718,89.8464-168.3C79.1616-24.7526-11.9622,24.5272,28.4648,87.3654c21.4881,33.4004,53.1448,37.7385,87.4074,26.9508,58.8335-18.5239,94.0082-.6545,116.7908-.6545Z"/>
</svg>ploading BearBnB_logo.svg…]()


# Generator commands used

```bash
yarn psy g:model User email:citext first_name:string last_name:string --no-serializer
yarn psy g:model Guest User:belongs_to
yarn psy g:model Host User:belongs_to
yarn psy g:resource v1/host/places Place name:citext style:enum:place_styles:cottage,cabin,lean_to,treehouse,tent,cave,dump sleeps:integer deleted_at:datetime
yarn psy g:model --no-serializer HostPlace Host:belongs_to Place:belongs_to deleted_at:datetime

yarn psy g:resource v1/host/places/rooms Room type:enum:room_types:Bathroom,Bedroom,Kitchen,Den,LivingRoom,Garage Place:belongs_to position:integer deleted_at:datetime

yarn psy g:sti-child --help
yarn psy g:sti-child Room/Bathroom extends Room bath_or_shower_type:enum:bath_or_shower_types:bath,shower,bath_and_shower,none
yarn psy g:sti-child Room/Bedroom extends Room bed_types:enum:bed_types:twin,bunk,queen,king,cot,sofabed
yarn psy g:sti-child Room/Kitchen extends Room appliances:enum:appliance_types:stove,oven,microwave,dishwasher
yarn psy g:sti-child Room/Den extends Room
yarn psy g:sti-child Room/LivingRoom extends Room
yarn psy g:resource v1/host/localized-texts LocalizedText localizable_type:enum:localized_types:Host,Place,RoomBase localizable_id:bigint locale:enum:locales:en-US,es-ES title:string markdown:text deleted_at:datetime

yarn psy g:resource v1/guest/stays Stay Guest:belongs_to Place:belongs_to checkin_on:date checkout_on:date adults:integer cubs:integer
yarn psy g:controller v1/guest/places index
```

## Questions?

- **Ask them on [Stack Overflow](https://stackoverflow.com)**, using the `[psychic]` tag.

## Contributing

Psychic is an open source library, so we encourage you to actively contribute. Visit our [Contributing](https://github.com/rvohealth/bearbnb/CONTRIBUTING.md) guide to learn more about the processes we use for submitting pull requests or issues.

Are you trying to report a possible security vulnerability? Visit our [Security Policy](https://github.com/rvohealth/bearbnb/SECURITY.md) for guidelines about how to proceed.

