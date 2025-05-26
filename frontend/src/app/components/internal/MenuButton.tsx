import Close from "public/svg/Close";
import NetworkSwitcher from "../lib/NetworkSwitcher";
import GenericModal from "./util/GenericModal";
import Menu from "public/svg/Menu";

const MenuButton = () => {
  const togglePopover = ({ targetId }: { targetId: string }) => {
    const popover = document.getElementById(targetId);
    // @ts-ignore
    popover.togglePopover();
    if (popover) {
      popover.addEventListener("toggle", () => {
        if (popover.matches(":popover-open")) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "";
        }
      });
    }
  };
  return (
    <>
      <GenericModal
        popoverId="transaction-modal"
        style="mt-[5rem] h-screen w-full bg-transparent backdrop:mt-[1.5rem] md:mt-[5rem] md:backdrop:mt-[5rem]"
      >
        <div className="user-modal mx-auto flex w-full max-w-[--header-max-w] flex-col items-center py-8 md:items-end md:px-12">
          <div className="zoom flex max-w-[29rem] flex-col gap-4 rounded-[24px] bg-[--background] p-5 pt-5 shadow-popover-shadow transition-colors duration-500 ease-linear md:max-w-[34rem]">
            <div className="mb-6 flex justify-between">
              <h3 className="text-sm text-[--headings]">Network</h3>
              <button
                //@ts-ignore
                popovertarget="transaction-modal"
                className="text-[--headings]"
              >
                <Close />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-text-primary">Select Network</p>
              <NetworkSwitcher />
            </div>
            {/* <div>
              <button
                aria-haspopup="dialog"
                // @ts-ignore
                popovertarget="add-token-popover"
                className="w-full rounded-[12px] bg-accent-secondary p-2 text-background-primary-light md:p-3"
              >
                Add Token
              </button>
            </div> */}
          </div>
        </div>
      </GenericModal>

      <button
        aria-haspopup="dialog"
        onClick={() => togglePopover({ targetId: "transaction-modal" })}
        className="grid h-10 w-10 place-content-center rounded-full bg-accent-secondary text-[1.5em] text-background-primary-light md:h-12 md:w-12"
      >
        <Menu />
      </button>
    </>
  );
};

export default MenuButton;
