import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CampaignInterface } from "../lib/ts/interfaces";
import { faEye } from "@fortawesome/free-solid-svg-icons";
function CampaignsTBody({
  rows,
  displayRowKeys,
}: {
  rows: CampaignInterface[];
  displayRowKeys: string[];
}) {
  console.log(rows, displayRowKeys);

  return (
    <tbody>
      {rows.map((row) => (
        <tr className="text-txt-base border-2">
          <td>
            <button>
              <FontAwesomeIcon icon={faEye} />
            </button>
          </td>
          {displayRowKeys.map((key) => (
            <td>{row[key]}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export default CampaignsTBody;
