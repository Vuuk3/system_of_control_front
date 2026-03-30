import ButtonCell from "../ButtonCell/ButtonCell";
import ContactsCell from "../ContactsCell/ContactsCell";
import ProfileCell from "../ProfileCell/ProfileCell";
import TextCell from "../TextCell/TextCell";
import TimeCell from "../TimeCell/TimeCell";

function Cell({ props }) {
  console.log(props.data);
  return (
    <>
      {props.type == "text" ? (
        <TextCell data={props.text} />
      ) : props.type == "profile" ? (
        <ProfileCell id={props.id} photo={props.photo} name={props.name} />
      ) : props.type == "contacts" ? (
        <ContactsCell phone_number={props.phone} email={props.email} />
      ) : props.type == "time" ? (
        <TimeCell entry_time={props.entry_time} exit_time={props.exit_time} />
      ) : (
        <ButtonCell id={props.id} mode={props.mode} icon={props.icon} />
      )}
    </>
  );
}

export default Cell;
