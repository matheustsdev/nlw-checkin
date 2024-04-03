import { useState, useEffect } from "react";

import {
  Search,
  MoreHorizontal,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";
import { IconButton } from "./icon-button";
import { Table } from "./table/table";
import { TableHeader } from "./table/table-header";
import { TableCell } from "./table/table-cell";
import { TableRow } from "./table/table-row";
import { intlFormatDistance } from "date-fns";

type AttendeeType = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  checkedInAt: string | null;
};

export function AttendeeList() {
  const [attendees, setAttendees] = useState<AttendeeType[]>([]);
  const [totalAttendees, setTotalAttendees] = useState(0);
  const [search, setSearch] = useState(() => {
    const url = new URL(window.location.toString());

    const search = url.searchParams.get("search");

    return search ? search : "";
  });
  const [page, setPage] = useState(() => {
    const url = new URL(window.location.toString());

    const page = url.searchParams.get("page");

    return page ? Number(page) : 1;
  });

  const totalPages = Math.ceil(totalAttendees / 10);

  function setCurrentPage(page: number) {
    const url = new URL(window.location.toString());

    url.searchParams.set("page", String(page));

    window.history.pushState({}, "", url);

    setPage(page);
  }

  function setCurrentSearch(searchText: string) {
    const url = new URL(window.location.toString());

    url.searchParams.set("search", searchText);

    window.history.pushState({}, "", url);

    setSearch(searchText);
  }

  function goToFirstPage() {
    setCurrentPage(1);
  }

  function goToPreviousPage() {
    setCurrentPage(page - 1);
  }

  function goToNextPage() {
    setCurrentPage(page + 1);
  }

  function goToLastPage() {
    setCurrentPage(totalPages);
  }

  function onSearchInputChanged(event: React.ChangeEvent<HTMLInputElement>) {
    setCurrentSearch(event.target.value);
    setCurrentPage(1);
  }

  useEffect(() => {
    const url = new URL(
      "http://localhost:3333/events/9e9bd979-9d10-4915-b339-3786b1634f33/attendees"
    );

    url.searchParams.set("pageIndex", String(page - 1));

    if (search.length > 0) {
      url.searchParams.set("query", search);
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setAttendees(data.attendees);
        setTotalAttendees(data.total);
      });
  }, [page, search]);

  return (
    <div className=" flex flex-col gap-4">
      <div className="flex gap-3 items-center">
        <h1 className="text-2xl font-bold">Participantes</h1>
        <div className="w-72 border border-white/10 bg-transparent rounded-lg px-3 py-1.5 mt-3 flex items-center gap-3">
          <Search className="size-4 text-emerald-300" />
          <input
            className="flex-1 bg-transparent outline-none border-0 p-0 text-sm focus:ring-0"
            placeholder="Buscar participante..."
            onChange={onSearchInputChanged}
            value={search}
          />
        </div>
      </div>

      {/* === Table === */}
      <Table>
        <thead>
          <tr className="border-b border-white/10">
            <TableHeader style={{ width: 48 }}>
              <input
                type="checkbox"
                className="size-4 bg-black/20 rounded border border-white/10"
              />
            </TableHeader>
            <TableHeader>Código</TableHeader>
            <TableHeader>Participante</TableHeader>
            <TableHeader>Data de inscrição</TableHeader>
            <TableHeader>Data de check-in</TableHeader>
            <TableHeader style={{ width: 64 }}></TableHeader>
          </tr>
        </thead>
        <tbody>
          {attendees.map((attendee) => (
            <TableRow key={attendee.id}>
              <TableCell>
                <input
                  type="checkbox"
                  className="size-4 bg-black/20 rounded border border-white/10"
                />
              </TableCell>
              <TableCell>{attendee.id}</TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-white">{attendee.name}</span>
                  <span>{attendee.email}</span>
                </div>
              </TableCell>
              <TableCell>
                {intlFormatDistance(new Date(attendee.createdAt), new Date(), {
                  locale: "pt-BR",
                  numeric: "always",
                })}
              </TableCell>
              <TableCell>
                {attendee.checkedInAt ? (
                  intlFormatDistance(new Date(attendee.checkedInAt), new Date(), {
                    locale: "pt-BR",
                    numeric: "always",
                  })
                ) : (
                  <span className="text-zinc-400">Não fez check-in</span>
                )}
              </TableCell>
              <TableCell>
                <IconButton transparent>
                  <MoreHorizontal className="size-4" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <TableCell colSpan={3}>
              Mostrando {attendees.length} de {totalAttendees} itens
            </TableCell>
            <TableCell colSpan={3} className="text-right">
              <div className="inline-flex items-center gap-8">
                <span>
                  Página {page} de {totalPages}
                </span>
                <div className="flex gap-1.5">
                  <IconButton onClick={goToFirstPage} disabled={page === 1}>
                    <ChevronsLeft className="size-4" />
                  </IconButton>
                  <IconButton onClick={goToPreviousPage} disabled={page === 1}>
                    <ChevronLeft className="size-4" />
                  </IconButton>
                  <IconButton onClick={goToNextPage} disabled={page === totalPages}>
                    <ChevronRight className="size-4" />
                  </IconButton>
                  <IconButton onClick={goToLastPage} disabled={page === totalPages}>
                    <ChevronsRight className="size-4" />
                  </IconButton>
                </div>
              </div>
            </TableCell>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
}
