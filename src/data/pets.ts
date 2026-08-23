// Appendix A. The register is a registry entry: the mono line carries the
// facts, the prose line carries the joke. Keep the dry line to one sentence —
// the format is what stops warmth tipping into cute.
//
// Cap: six. Four to six reads as a documented appendix; past six the page
// becomes a gallery and starts competing with the case studies for weight.
//
// Photos: 4:5, cover-cropped, full colour. Uniform framing is what turns
// snapshots into a set. Strip EXIF before committing — these are photos taken
// at home, and the geotag is the part that matters.
export interface Pet {
  /** Given name, as it appears in the mono registry line. */
  name: string;
  /** Kind or breed, lowercase: "tabby", "shepherd mix". */
  kind: string;
  /** Year of birth, or acquisition where birth is unknown. */
  born: string;
  /** One dry sentence. This is where the personality lives. */
  line: string;
  /** Path under public/images/pets/. */
  src: string;
  /** Describes the photo for a reader who cannot see it, not the caption. */
  alt: string;
}

export const pets: Pet[] = [];
