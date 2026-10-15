import type { JSXElement } from "@fluentui/react-components";
import { Input, Label } from "@fluentui/react-components";


export default function UserLogin(): JSXElement {
//   const emailId = useId("input-email");
//   const urlId = useId("input-url");
//   const passwordId = useId("input-password");

  return (
    <form noValidate autoComplete="off">
      <div className="form-row">
        <Label className="form-label" >Email: </Label>
        <Input type="email" />
      </div>

      <div className="form-row">
        <Label className="form-label">Password: </Label>
        <Input type="password" />
      </div>
    </form>
  );
};
