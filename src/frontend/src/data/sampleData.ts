import { Category, type Item, type JournalEntry } from "../backend.d";

export const SAMPLE_ITEMS: Item[] = [
  {
    id: BigInt(1),
    name: "THE STOIC",
    category: Category.personality,
    shortDescription: "Unmoved. Unreadable. A fortress built from silence.",
    longDescription:
      "The Stoic persona grants you imperviousness — the cool, crystalline distance that others mistake for wisdom. You will stand in burning rooms and feel nothing. You will answer cruelty with calm. You will be the last one standing, untouched, because you have learned to turn touch away at the door. This is not peace. This is the costume of peace.",
    existentialPrice: "One Year of Laughter",
  },
  {
    id: BigInt(2),
    name: "THE ROMANTIC",
    category: Category.personality,
    shortDescription:
      "To love everything, even the things that will destroy you.",
    longDescription:
      "The Romantic sees beauty in decay, meaning in misfortune, poetry in the mundane wound. The world becomes a stage and every stranger a potential savior. You will fall in love with ideas before facts, with potential before presence. The cost of this vision is proportion — you will never again see things as they simply are.",
    existentialPrice: "Your Capacity for Indifference",
  },
  {
    id: BigInt(3),
    name: "THE ARCHITECT",
    category: Category.personality,
    shortDescription: "Control. Systems. The illusion of order over chaos.",
    longDescription:
      "The Architect sees the world as solvable — a puzzle of inputs and outputs, cause and effect, design and execution. In acquiring this persona, you gain the extraordinary ability to impose structure on the formless. But structure has a shadow: it will cast its grid over everyone you love, turning people into variables you endlessly try to optimize.",
    existentialPrice: "Spontaneous Joy",
  },
  {
    id: BigInt(4),
    name: "THE WANDERER",
    category: Category.personality,
    shortDescription: "Free. Boundless. Belonging nowhere, everywhere.",
    longDescription:
      "This persona grants you perpetual motion — an irresistible pull toward the new, the far, the undiscovered. You will accumulate landscapes instead of relationships, moments instead of memories. The horizon will always call louder than anyone standing in front of you. You will be free. You will also, in quiet hours, wonder what it means that nothing holds you.",
    existentialPrice: "The Feeling of Home",
  },
  {
    id: BigInt(5),
    name: "THE GREAT ESCAPE",
    category: Category.dream,
    shortDescription:
      "A new city. A new name. A life unburdened by who you were.",
    longDescription:
      "You leave. Quietly, completely — no forwarding address, no explanations. A new city receives you like a blank page. A new name sits in your mouth like a stone that slowly becomes familiar. The dream delivers exactly what it promises: a clean departure. What it does not advertise is what waits in the new silence when the novelty fades and you discover you packed yourself after all.",
    existentialPrice: "Everyone Who Stayed",
  },
  {
    id: BigInt(6),
    name: "THE MASTERWORK",
    category: Category.dream,
    shortDescription: "To make the one thing that outlasts you.",
    longDescription:
      "This dream is the oldest bargain in the catalog: legacy for life. You will spend a decade in service to a single, consuming act of creation. It will cost you mornings, then evenings, then the middle of ordinary days. It will cost you relationships that did not understand, and others that understood too well and quietly left. In the end, the work will be finished. It will be extraordinary. And you will be emptied.",
    existentialPrice: "Ten Years of Sleep",
  },
  {
    id: BigInt(7),
    name: "THE RETURN",
    category: Category.dream,
    shortDescription:
      "To go back. To undo. To begin again from where it broke.",
    longDescription:
      "The Return dream offers the most seductive fiction: that you can go home again, that the people are still there, that the versions of you who made the wrong turns can be recovered and corrected. You know intellectually this is impossible. Yet you acquire the dream anyway, and it functions as intended — it gives you something to mourn that is specific enough to name. Grief with a target is almost a comfort.",
    existentialPrice: "Acceptance of the Present",
  },
  {
    id: BigInt(8),
    name: "TO BE SEEN",
    category: Category.desire,
    shortDescription:
      "Truly known. Truly witnessed. Not the version you perform.",
    longDescription:
      "This desire is the most commonly purchased and the most commonly returned — though returns are not accepted. To be seen means to be visible. And visibility, unlike the softer fantasy you imagined, does not come with protection. It comes with exposure. The eyes that find you will include eyes that judge, eyes that reduce, eyes that see only what they arrived looking for. You will be seen. You did not specify by whom.",
    existentialPrice: "Your Carefully Built Solitude",
  },
  {
    id: BigInt(9),
    name: "ABSOLUTE CERTAINTY",
    category: Category.desire,
    shortDescription: "To know. Without doubt. To stop living in the question.",
    longDescription:
      "You have been uncertain too long. Uncertain of your choices, your value, your direction, your worth to those who claim to love you. This desire delivers resolution: a settling, a clicking into place, a stillness in the chest where the noise was. The catch — and there is always a catch — is that certainty forecloses possibility. You will never again wonder if things could be otherwise, because you will know they cannot.",
    existentialPrice: "Every Remaining Possibility",
  },
  {
    id: BigInt(10),
    name: "TO DISSOLVE",
    category: Category.desire,
    shortDescription: "To stop being separate. To merge. To finally rest.",
    longDescription:
      "The boundary between self and other has always felt arbitrary to you — a bureaucratic fiction maintained at enormous cost. This desire offers dissolution: the edges of you soften, the inside opens, the exhausting maintenance of a separate identity begins to relax. You will feel, for the first time, genuinely connected. You will also, in moments, forget where you end and the world begins. This is either the destination or the problem, depending on the hour.",
    existentialPrice: "Your Individual Will",
  },
];

export const SAMPLE_JOURNAL_ENTRIES: JournalEntry[] = [
  {
    id: BigInt(1),
    title: "On the Theater of the Self",
    themeTag: "IDENTITY",
    excerpt:
      "We are not selves so much as ongoing performances — dress rehearsals for a character we never quite finalize.",
    content: `We are not selves so much as ongoing performances — dress rehearsals for a character we never quite finalize. The sociologist Erving Goffman called it dramaturgy: the idea that social life is a stage, and we are its perpetual actors, adjusting our costumes and cues depending on the audience.

But the stage has become more elaborate. We now perform for algorithms as well as people, curating selves that exist in fragments across platforms, each a slightly different emphasis, a slightly different truth. The question is not merely who we are, but who we are *for*, and whether anything persists in the wings when the audience leaves.

The Self Market was born from this observation. Not as a solution, but as a mirror. Every product in our catalog is something people already buy — not here, but in the long transactions of daily life. We simply name the cost.

You acquire confidence by trading away your sensitivity. You acquire presence by trading away your privacy. You acquire certainty by trading away the generative discomfort of doubt. These are not metaphors. They are the actual terms.

The question our catalog poses is not whether to trade — we are all trading, always — but whether to trade *consciously*. To see the terms written out plainly before you sign. To choose your costume knowing it is a costume, and to wear it anyway, with clear eyes.

This is, we believe, the closest thing to authenticity on offer.`,
  },
  {
    id: BigInt(2),
    title: "The Cost of Becoming",
    themeTag: "TRANSFORMATION",
    excerpt:
      "Every act of becoming is simultaneously an act of un-becoming. The question is whether you know what you are leaving behind.",
    content: `Every act of becoming is simultaneously an act of un-becoming. The question is whether you know what you are leaving behind.

When we speak of growth, we speak only of acquisition — new skills, new perspectives, new capacities. We treat the self as an expanding container. But growth is also loss. The person you were at twenty had certainties you have since dismantled. Had enthusiasms that have been replaced by knowledge, which is often a less lively thing.

The child does not become the adult by addition. Something is subtracted. The particular quality of wonder that belongs to not-yet-knowing — that is a casualty of education. Not a failure of education, simply its necessary shadow.

This is what our Desires catalog tries to honor: the complexity of wanting. When you desire Absolute Certainty, you are not wrong to want it. The longing is real, and its origins are painful. We only want you to see the full ledger before the transaction completes.

The mystic traditions were more honest about this than we tend to be. They called it the price of initiation — what you must leave at the threshold to enter. Most of us make these exchanges unknowingly, in slow increments, across decades. The Self Market simply accelerates the timeline and makes visible what was always happening.

Becoming is a continuous cost. The only question is whether you are shopping consciously, or being shopped.`,
  },
  {
    id: BigInt(3),
    title: "Portraits of the Unrecognized",
    themeTag: "LONGING",
    excerpt:
      "The faces in our catalog are not models. They are composites of every person who has ever wanted to be someone other than themselves.",
    content: `The faces in our catalog are not models. They are composites — averages and abstractions assembled from the long record of human wanting.

There is a photograph that circulates in psychology papers of a so-called 'average face' — the result of overlaying hundreds of individual portraits until individual features dissolve into a kind of statistical beauty. The result is always striking: more symmetrical than any single face, somehow more recognizable than any of the inputs.

Our catalog images work on the same principle, but in reverse. We start from the archetype and work backward toward the particular. The Stoic's portrait is assembled from every face that has ever learned stillness as a survival strategy. The Romantic's from every person who has chosen meaning over accuracy and loved the wound as much as the wound's source.

They are all recognizable because they are all us. Or rather: they are all available to us. We contain multitudes — the cliché is true — and the market simply externalizes what was already internal: the endless catalog of possible selves that flickers through imagination on sleepless nights and ordinary afternoons when the present self feels, temporarily, like the wrong choice.

You are not in crisis when you browse this catalog. You are simply being human, which has always involved this particular restlessness: the suspicion that somewhere in the vast inventory of possible versions of yourself, there is one that fits better than the one you are wearing.`,
  },
];
