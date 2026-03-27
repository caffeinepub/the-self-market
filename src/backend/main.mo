import Map "mo:core/Map";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";

actor {
  type Category = { #personality; #dream; #desire };

  type Item = {
    id : Nat;
    name : Text;
    category : Category;
    shortDescription : Text;
    longDescription : Text;
    existentialPrice : Text;
  };

  type JournalEntry = {
    id : Nat;
    title : Text;
    excerpt : Text;
    content : Text;
    themeTag : Text;
  };

  module Item {
    public func compare(item1 : Item, item2 : Item) : Order.Order {
      switch (Nat.compare(item1.id, item2.id)) {
        case (#equal) { item1.name.compare(item2.name) };
        case (order) { order };
      };
    };
  };

  let items = Map.fromIter<Nat, Item>([
    (
      1,
      {
        id = 1;
        name = "The Optimist";
        category = #personality;
        shortDescription = "The eternal hope in the face of darkness";
        longDescription = "The Optimist sees light where there is none, believes in miracles, and remains unbroken by reality. With this, you'll never lose faith in better days.";
        existentialPrice = "your capacity for grief";
      },
    ),
    (
      2,
      {
        id = 2;
        name = "The Rebel";
        category = #personality;
        shortDescription = "The spirit that refuses to conform";
        longDescription = "The Rebel breaks rules, questions authority, and creates chaos. This will give you the power to challenge any system.";
        existentialPrice = "your sense of belonging";
      },
    ),
    (
      3,
      {
        id = 3;
        name = "The Romantic";
        category = #personality;
        shortDescription = "The heart that loves without limits";
        longDescription = "The Romantic believes in true love, grand gestures, and happy endings. Embrace this and you'll feel every emotion deeply.";
        existentialPrice = "your ability to accept reality";
      },
    ),
    (
      4,
      {
        id = 4;
        name = "The Ghost";
        category = #personality;
        shortDescription = "The one who cannot be touched";
        longDescription = "The Ghost drifts through life unseen, untouchable, and alone. With this you become immune to pain, but also joy.";
        existentialPrice = "your presence in others' lives";
      },
    ),
    (
      5,
      {
        id = 5;
        name = "To Be Loved";
        category = #dream;
        shortDescription = "The universal desire for unconditional acceptance";
        longDescription = "To Be Loved is the core of human longing. This dream offers eternal companionship and understanding.";
        existentialPrice = "your vulnerability";
      },
    ),
    (
      6,
      {
        id = 6;
        name = "To Be Free";
        category = #dream;
        shortDescription = "The longing for total independence";
        longDescription = "To Be Free means living without fear, judgment, or restraint. This dream gives you wings but isolates you from connection.";
        existentialPrice = "your roots and home";
      },
    ),
    (
      7,
      {
        id = 7;
        name = "To Be Remembered";
        category = #dream;
        shortDescription = "The wish to leave a lasting impact";
        longDescription = "To Be Remembered ensures your legacy endures. This dream grants immortality in memory but anchors you to the past.";
        existentialPrice = "your future potential";
      },
    ),
    (
      8,
      {
        id = 8;
        name = "To Begin Again";
        category = #dream;
        shortDescription = "The chance for a fresh start";
        longDescription = "To Begin Again wipes the slate clean, erasing past mistakes. This dream offers freedom but costs everything you've learned.";
        existentialPrice = "your story so far";
      },
    ),
    (
      9,
      {
        id = 9;
        name = "Power";
        category = #desire;
        shortDescription = "The drive to control and dominate";
        longDescription = "Power brings influence, authority, and strength. This desire can reshape worlds but corrupts absolutely.";
        existentialPrice = "your compassion";
      },
    ),
    (
      10,
      {
        id = 10;
        name = "Belonging";
        category = #desire;
        shortDescription = "The need to fit in and be accepted";
        longDescription = "Belonging offers comfort, community, and safety. This desire brings peace but can stifle individuality.";
        existentialPrice = "your uniqueness";
      },
    ),
    (
      11,
      {
        id = 11;
        name = "Oblivion";
        category = #desire;
        shortDescription = "The urge to escape and disappear";
        longDescription = "Oblivion is the ultimate release from pain and memory. This desire grants peace but erases your identity.";
        existentialPrice = "your existence";
      },
    ),
    (
      12,
      {
        id = 12;
        name = "Recognition";
        category = #desire;
        shortDescription = "The craving for acknowledgment and praise";
        longDescription = "Recognition brings validation, attention, and respect. This desire fills emptiness but can become addictive.";
        existentialPrice = "your humility";
      },
    ),
  ].values());

  let journalEntries = Map.fromIter<Nat, JournalEntry>([
    (
      1,
      {
        id = 1;
        title = "The Mask We Wear";
        excerpt = "Exploring the concept of identity and the personas we create.";
        content = "Identity is fluid, changing with experience and perception. The Mask We Wear discusses how we adapt to fit societal expectations and the cost of losing authenticity.";
        themeTag = "identity";
      },
    ),
    (
      2,
      {
        id = 2;
        title = "The Art of Letting Go";
        excerpt = "Understanding the process of self-loss and rebirth.";
        content = "Letting go is essential for growth. The Art of Letting Go examines the pain of releasing attachments and the freedom that comes from embracing change.";
        themeTag = "self-loss";
      },
    ),
  ].values());

  public query ({ caller }) func getAllItems() : async [Item] {
    items.values().toArray().sort();
  };

  public query ({ caller }) func getItemsByCategory(category : Category) : async [Item] {
    items.values().toArray().filter(func(item) { category == item.category });
  };

  public query ({ caller }) func getItemById(id : Nat) : async Item {
    switch (items.get(id)) {
      case (null) { Runtime.trap("Item not found") };
      case (?item) { item };
    };
  };

  public query ({ caller }) func getAllJournalEntries() : async [JournalEntry] {
    journalEntries.values().toArray();
  };

  public query ({ caller }) func getJournalEntryById(id : Nat) : async JournalEntry {
    switch (journalEntries.get(id)) {
      case (null) { Runtime.trap("Entry not found") };
      case (?entry) { entry };
    };
  };
};
