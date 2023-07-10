## Object Oriented Programming in Memes

!["Yo Dawg, I hear you like object oriented programming, so I nested a class inside your class so you can create objects while you create objects"](https://images.abbeyperini.com/OOP-memes/dawg.jpg)

Object Oriented Programming (OOP) languages, like JavaScript and Python, organize software design around data, formatted in objects, rather than function or logic.

First, I’ll cover the basics: objects, classes, instance, and methods. Then, I’ll briefly explain the four main pillars of OOP design: Encapsulation, Abstraction, Inheritance, and Polymorphism.

### Objects

An object is data formatted to represent a real world object that has a state and behavior.

!["Here is my desired state. Make it so!" - Captain Picard](https://images.abbeyperini.com/OOP-memes/picard.jpeg)

Picard’s state would be “wants to set a course” and his behaviors would be telling an ensign the desired course and to “Make it so.”

### Classes

Different programming languages go about this different ways, but essentially a class is a blueprint for creating an object.

!["Yo Dawg, I hear you like object oriented programming, so I nested a class inside your class so you can create objects while you create objects"](https://images.abbeyperini.com/OOP-memes/dawg.jpg)

### Instance

Any time an object is created it is [instantiated](https://www.crondose.com/2016/07/what-does-instantiation-mean/).

![Many Spongebobs sitting at office desks as a metaphor for the mind](https://images.abbeyperini.com/OOP-memes/sponge.jpeg)

Each deskSponge shown here would be an instance of an object and because they’re made with the `Spongebob` class, an instance of `Spongebob`.

### Methods

Functions within an object.

![An office worker hits a button and a large coffee machine squirts coffee directly in her mouth. She then types frantically.](https://images.abbeyperini.com/OOP-memes/coffee.gif)

*[Source](https://www.behance.net/qaisicle)*

In other words, our object’s behaviors. The coffee machine above would have a method for making coffee and the button would call it. The office worker would have a method for pushing the button, drinking the coffee, and caffeinated typing.

### Encapsulation

You don’t need to know how the coffee machine works to press the button and get coffee.

!["You automatic coffee machines think you're so great, huh? But can you do this?" Drip machine watches in confusion. French press moves its plunger.](https://images.abbeyperini.com/OOP-memes/french.gif)

![Now two french presses are rapidly moving their plungers, and the automatic coffee machine looks horrified.](https://images.abbeyperini.com/OOP-memes/frenchies.gif)

*[Source](https://lolnein.com/2019/10/29/coffeemachinevsfrenchpress/)*

In other words, the behavior and state of the object in question should be private and only affected by private methods within the object. (The person who pressed the button doesn’t see the water being heated and pushed through the coffee grounds.) The object should have public methods that other objects can use to interact with it (like the button).

### Abstraction

The only information about an object that is available outside the object is information absolutely necessary for other objects to use it.

![A seagull and crab discuss the crab's mysterious journey in a small row boat, ending with "any details will remain a mystery."](https://images.abbeyperini.com/OOP-memes/crab.png)

*[Source](http://www.poorlydrawnlines.com/comic/your-story/)*

This is also referred to as [information hiding](https://en.wikipedia.org/wiki/Encapsulation_(computer_programming)#An_information-hiding_mechanism), and the public methods made available for other objects are “getters” and “setters.”

### Inheritance

Just like genetics — if a class was a dog and each object inheriting from the dog class was a puppy.

![A dog mom stands in front of her puppies. The caption reads "I made dis. And dis. And dis. And dis. And dis. And dis."](https://images.abbeyperini.com/OOP-memes/made.jpg)

Objects made with a class (JavaScript uses the keyword `extends`) inherit the information and methods of the super (or parent) class (calling `super()` in the `constructor` in a JavaScript object).

### Polymorphism

`Fred` and `ghostFred` both have a method called `getDressed()`. When `getDressed()` is called, `Fred` will put on his ascot, and `ghostFred` will put on his ghost costume.

![Fred from Scooby Doo unmasks a ghost villain to reveal... also Fred](https://images.abbeyperini.com/OOP-memes/ghost.jpg)

In this case, `Fred` is the class, and `ghostFred` is an object that extends `Fred`. `ghostFred` inherits the method `getDressed()` from `Fred`, but when `ghostFred` is instantiated, the programmer passes different arguments to `getDressed()` and/or changes the method’s code. The OOP language evaluates which `getDressed()` to use based on which object is being referenced when it is called (the object the [`this` keyword](https://www.w3schools.com/js/js_this.asp) would refer to). Used correctly, this can significantly cut down on repeated code.

![Caption: "Me: explains polymorphism Friend: So the subclass the same as the superclass? Me:" A claymation pirate saying "Well yes, but actually no"](https://images.abbeyperini.com/OOP-memes/pirate.jpg)

### Conclusion

If you’re an experienced developer, hopefully you got a chuckle out of this. If you’re a beginner, I hope it helps you use an OOP language more confidently!

If you enjoyed this high level overview of OOP in memes or it left you with more questions, leave a comment!
