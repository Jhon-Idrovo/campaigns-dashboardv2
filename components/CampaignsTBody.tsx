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
  return (
    <tbody>
      {rows.map((row) => (
        <tr className="text-txt-base border-2" key={row.id}>
          <td>
            <button>
              <FontAwesomeIcon icon={faEye} />
            </button>
          </td>
          {displayRowKeys.map((key) => (
            <td key={key + row.id} className="text-right">
              {row[key]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export default CampaignsTBody;
