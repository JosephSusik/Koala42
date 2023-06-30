export type DataType = Array<{
  data: {
    ID: string
    Name: string
    Gender: string
    Ability: string
    "Minimal distance": string
    Weight: string
    Born: string
    "In space since": string
    "Beer consumption (l/y)": string
    "Knows the answer?": string
  }
  children: {
    has_nemesis?: {
      records: Array<{
        data: {
          ID: string
          "Character ID": string
          "Is alive?": string
          Years: string
        }
        children: {
          has_secrete?: {
            records: Array<{
              data: {
                ID: string
                "Nemesis ID": string
                "Secrete Code": string
              }
              children: {}
            }>
          }
        }
      }>
    }
  }
}>
