
/*
--#--#--#--#--#--#--#--#--#--#--#--#--#--#--#
#--#--#--#--#--#--#--#--#--#--#--#--#--#--#--
--#--#--#--#--#--#--#--#--#--#--#--#--#--#--#
#--#--#--#--#--#--#--#--#--#--#--#--#--#--#--
      BEGIN AUTOGENERATED MESSAGE
--#--#--#--#--#--#--#--#--#--#--#--#--#--#--#
#--#--#--#--#--#--#--#--#--#--#--#--#--#--#--
--#--#--#--#--#--#--#--#--#--#--#--#--#--#--#
#--#--#--#--#--#--#--#--#--#--#--#--#--#--#--



      ,▄█▄                                               
    ]█▄▄                         ╓█████▌                 
    ▐██████▄                   ▄█████▓╣█                 
     ║████████▄,  ,  ,,▄,▄▄▄▓██████╬╬╣╣▌                 
      ╚███╣██████████▓▓▓▓██████████╩╠╬▓                  
       ╙█╬╬╬▓███████████████████████▒▓▌                  
        ╙▓█▓██████████████████████████                   
         ╚██████▀███████████╩█▓▌▐▓████▄                  
         '║█████`╣█Γ║████████▄▄φ▓█████▌                  
          ║█████████████████████▓█████▌                  
           █████████████▓▓████████████                   
           ║█████████████████████████                    
          ]█████████████████████████                     
         ,▓██████████████████████████                    
        ▓█████████████████████████████µ                  
       ▐███████████████████████████████▄▄                
       ║█████████████████████████████████╬╬╣▓            
   ,╔╦║███████████████████████████████████▓╬╬╣           
,≥≥⌠░░░╠▓████████████████████████████████████▓▓          
,;=-',▄█████████████████████████████████████████▓        
                                                         
                                                         
                                                         
  ██████╗ ███████╗██╗   ██╗ ██████╗██╗  ██╗██╗ ██████╗   
  ██╔══██╗██╔════╝╚██╗ ██╔╝██╔════╝██║  ██║██║██╔════╝   
  ██████╔╝███████╗ ╚████╔╝ ██║     ███████║██║██║        
  ██╔═══╝ ╚════██║  ╚██╔╝  ██║     ██╔══██║██║██║        
  ██║     ███████║   ██║   ╚██████╗██║  ██║██║╚██████╗   
  ╚═╝     ╚══════╝   ╚═╝    ╚═════╝╚═╝  ╚═╝╚═╝ ╚═════╝   
                                                         
                                                         

This file was automatically generated by my cat, Aster.
He does not want you mucking about with his files,
and we are pretty lax on trimming his nails.

I mean, we have him pretty well fenced in but he is an
escape artist and he still manages to get fleas!

My point is, don't go mucking about with his files!

He actually has a hopefully well-tempered message for
us humans, he says:

"
  Dear pathetic humans,

  Here is a haiku to keep you in line

  don't dare go mucking
  with my files, I lyke them fine
  prettierignore
"

Sorry, that's the best we are ganna get from him
when you ask him to add a disclaimer to all
autogenerated files on a SUNDAY, when the sun
is hitting the perfect spot in the living room
for a mid-morning nap! He can get saucy, and he
is looking over my shoulder and would like me to
remind all humans that

"
a.) I have sharp claws.
b.) All laptops are ok sleeping places for your
    cat overlords. when we decide to sleep on
    them, it is because they are our beds, and
    we just loan them out to you so you can go
    out and get us the right food.
"

--#--#--#--#--#--#--#--#--#--#--#--#--#--#--#
#--#--#--#--#--#--#--#--#--#--#--#--#--#--#--
--#--#--#--#--#--#--#--#--#--#--#--#--#--#--#
#--#--#--#--#--#--#--#--#--#--#--#--#--#--#--
      END AUTOGENERATED MESSAGE
--#--#--#--#--#--#--#--#--#--#--#--#--#--#--#
#--#--#--#--#--#--#--#--#--#--#--#--#--#--#--
--#--#--#--#--#--#--#--#--#--#--#--#--#--#--#
#--#--#--#--#--#--#--#--#--#--#--#--#--#--#--

*/
import { CalendarDate } from '@rvohealth/dream'
import { DateTime } from 'luxon'
/**
 * This file was generated by kysely-codegen.
 * Please do not edit it manually.
 */

import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Int8 = ColumnType<string, bigint | number | string, bigint | number | string>;
export type IdType = string | number | bigint
export type Timestamp = ColumnType<DateTime | CalendarDate>

export interface Guests {
  createdAt: Timestamp;
  id: Generated<Int8>;
  updatedAt: Timestamp;
  userId: Int8;
}

export interface Users {
  createdAt: Timestamp;
  email: string;
  firstName: string | null;
  id: Generated<Int8>;
  lastName: string | null;
  updatedAt: Timestamp;
}

export interface DB {
  guests: Guests;
  users: Users;
}


export class DBClass {
  guests: Guests
  users: Users
}
