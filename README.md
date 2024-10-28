# BearBnB

An AirBnB clone for bears to demonstrate Dream and Psychic


# Generator commands used

```bash
yarn psy g:model User email:citext first_name:string last_name:string --no-serializer
yarn psy g:model Guest User:belongs_to
yarn psy g:model Host User:belongs_to
yarn psy g:resource v1/host/places Place name:citext style:enum:place_styles:cottage,cabin,lean_to,treehouse,tent,cave,dump deleted_at:datetime
yarn psy g:model --no-serializer HostPlace Host:belongs_to Place:belongs_to deleted_at:datetime
yarn psy g:resource v1/guest/stays Stay Guest:belongs_to Place:belongs_to checkin_on:date checkout_on:date adults:integer cubs:integer
yarn psy g:resource v1/host/rooms Room/Base type:enum:room_types:Bathroom,Bedroom,Kitchen,Den,LivingRoom,Garage Place:belongs_to position:integer deleted_at:datetime
yarn psy g:sti-child --help
yarn psy g:sti-child Room/Bathroom extends Room/Base bath_or_shower_type:enum:bath_or_shower_types:bath,shower,bath_and_shower,none
yarn psy g:sti-child Room/Bedroom extends Room/Base number_of_beds:integer bed_types:enum[]:bed_types:twin,bunk,queen,king,cot,sofabed
yarn psy g:sti-child Room/Bedroom extends Room/Base number_of_beds:integer bed_types:enum:bed_types:twin,bunk,queen,king,cot,sofabed
yarn psy g:sti-child Room/Kitchen extends Room/Base appliances:enum:appliance_types:stove,oven,microwave,dishwasher
yarn psy g:sti-child Room/Den extends Room/Base
yarn psy g:sti-child Room/LivingRoom extends Room/Base
yarn psy g:resource v1/host/localized-texts LocalizedText localizable_type:enum:localized_types:Host,Place,RoomBase localizable_id:bigint locale:enum:locales:en-US,es-ES title:string markdown:text deleted_at:datetime
```
