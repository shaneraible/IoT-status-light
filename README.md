# IoT-status-light
To be continued...

SCENARIO: You're now working from home, taking classes from home, or just need space. People are used to being able to just walk in, or even a knock could disctract you during a presentation. You need an easy way to tell people when it's ok to come in.

SOLUTION: Simple implementation at the moment -- iOS app that sends status updates to the .NET server, .NET server holds your current status, and ESP8266 fetches status from the server. When you say you're busy on the app -- the light above your door is red -- when you're not its a green and blue pulse! If you're busy and someone wants to come in, there is support for a doorbell that will silently show that someone is at the door in the app (I would have to pay to be able to use push notifications in iOS).

Skills used:
- .NET/C#

Skills gained:
- ESP8266 networking
- Swift/iOS app dev

# demo
<img width="200" alt="portfolio_view" src="/statuslight.gif">
