## Gang of Four Design Patterns in Memes - Creational

![A factory worker sees three triangles and one circle on a conveyor belt. They say "i guess we doin circles now"](https://images.abbeyperini.com/gof/factory.jpg)

The Gang of Four (GoF) are Erich Gamma, Richard Helm, Ralph Johnson, and John Vlissides. They wrote _Design Patterns: Elements of Reusable Object-Oriented Software_. In it, they documented 23 classic software design patterns.

There are five creational design patterns - they cover the instantiation of objects.

## Singleton

There can only be one instance.

![There can only be one. A Scottish warrior from the movie Highlander](https://images.abbeyperini.com/gof/highlander.jpg)

Useful for when more than one copy of an object or class would break your system.

## Factory Method

A factory is an interface for creating an object. Its subclasses determine  the shape of the instantiated object.

![A factory worker sees three triangles and one circle on a conveyor belt. They say "i guess we doin circles now"](https://images.abbeyperini.com/gof/factory.jpg)

Useful for when the creation of some objects is complex enough to be abstracted and those objects have overlapping implementation details.

## Abstract Factory

Essentially a factory of factories - a list of creation methods for a group of factories.

![Every friend group: My Hero Academia characters labeled "the one chill/parent of the group", "the kid with anger problems", and "the energetic one"](https://images.abbeyperini.com/gof/friends.jpg)

Useful for factories need to be grouped together.

## Builder

A list of methods for constructing parts of an object.

![Homer Simpson at the nuclear power plant operation board looking panicked labelled "too many choices. too many options"](https://images.abbeyperini.com/gof/homer.jpg)

Useful for when you have so many optional parameters that passing them through a factory is error-prone.

## Prototype

New objects are created by copying an existing object, inheriting characteristics from the parent object.  

![One person holding an object says "this is my property" and hands it to another person. The second person hold the object. The second person says "this is my property."](https://images.abbeyperini.com/gof/property.png)

More efficient for complex object creation. JavaScript uses prototypical inheritance.
