import { FC } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

interface PaginationComponentProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const getPagesToDisplay = (
  currentPage: number,
  totalPages: number
): (number | string)[] => {
  if (totalPages <= 4)
    return Array.from({ length: totalPages }, (_, i) => i + 1);

  if (totalPages === 5)
    if (currentPage <= 2) return [1, 2, "...", 5];
    else if (currentPage === 3) return [2, 3, 4, 5];
    else return [1, "...", 4, 5];

  // For totalPages > 5,
  const delta = 1;
  const left = Math.max(currentPage - delta, 2);
  const right = Math.min(currentPage + delta, totalPages - 1);
  const pages: (number | string)[] = [1];

  if (left > 2) pages.push("...");

  for (let i = left; i <= right; i++) pages.push(i);

  if (right < totalPages - 1) pages.push("...");

  pages.push(totalPages);
  return pages;
};

const MyPagination: FC<PaginationComponentProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pagesToDisplay = getPagesToDisplay(currentPage, totalPages);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) onPageChange(currentPage - 1);
            }}
          />
        </PaginationItem>
        {pagesToDisplay.map((page, index) =>
          typeof page === "number" ? (
            <PaginationItem key={index}>
              <PaginationLink
                href="#"
                isActive={page === currentPage}
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(page);
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ) : (
            <PaginationItem key={index}>
              <PaginationEllipsis>{page}</PaginationEllipsis>
            </PaginationItem>
          )
        )}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) onPageChange(currentPage + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default MyPagination;
