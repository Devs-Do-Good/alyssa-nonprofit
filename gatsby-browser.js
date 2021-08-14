import { AuthorsField } from "./src/fields/authors"
import "firebase/functions";

export const onClientEntry = () => {
  window.tinacms.fields.add({
    name: "authors",
    Component: AuthorsField,
  })
}
