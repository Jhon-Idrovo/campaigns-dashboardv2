import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CampaignInterface } from "../lib/ts/interfaces";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
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
          <td className="">
            <Link href={`/panel/campaigns/${row.id}`}>
              <a>
                <FontAwesomeIcon icon={faEye} />
              </a>
            </Link>
          </td>
          {displayRowKeys.map((key) => (
            <td
              key={key + row.id}
              className="text-right pl-4 whitespace-nowrap"
            >
              {/* since typeof 'a'[0] = string we don't have to 
              care about hancling it separately
              cases:
              typeof 'some string'[0] = string
              typeof ['some string'][0] = string
              typeof [{some obj}][0] = object
              */}
              {typeof row[key as any][0] === "object"
                ? row[key].map((refObj) => refObj?.name)
                : row[key]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export default CampaignsTBody;
