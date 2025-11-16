"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { FolderIcon } from "lucide-react";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";

const CreateIdeaDialog = ({
  setIdeas,
}: {
  setIdeas: Dispatch<SetStateAction<string[]>>;
}) => {
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"}>Create Idea</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Idea Workspace</DialogTitle>
          <DialogDescription>
            Create a strategy workspace to develop your ideas.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setIdeas((prev) => [...prev, name]);
            setOpen(false);
          }}
        >
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="idea-name">Idea Name</FieldLabel>
                <Input
                  id="idea-name"
                  placeholder="Enter idea name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Field>
            </FieldGroup>
            <Button type="submit">Create</Button>
          </FieldSet>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const EmptyIdeaState = ({
  setIdeas,
}: {
  setIdeas: Dispatch<SetStateAction<string[]>>;
}) => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderIcon />
        </EmptyMedia>
        <EmptyTitle>Empty Workspace</EmptyTitle>
        <EmptyDescription>
          You have not created any ideas workspaces yet. Get started by creating
          a new idea.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <CreateIdeaDialog setIdeas={setIdeas} />
      </EmptyContent>
    </Empty>
  );
};

export default function Page() {
  const [ideas, setIdeas] = useState<string[]>([]);

  return (
    <div className="flex flex-col min-h-dvh">
      <div className="flex justify-between items-center py-2 px-3 bg-muted">
        <p className="font-semibold">Recents</p>
        {ideas.length > 0 && <CreateIdeaDialog setIdeas={setIdeas} />}
      </div>
      {ideas.length === 0 ? (
        <div className="flex flex-1 justify-center items-center">
          <EmptyIdeaState setIdeas={setIdeas} />
        </div>
      ) : (
        <div className="flex flex-wrap gap-2 p-3">
          {ideas.map((idea, index) => (
            <Link
              key={index}
              href={`/app/projects/${encodeURIComponent(idea)}`}
            >
              <div key={index} className="p-4 w-48 rounded-md border shadow-sm">
                <h3 className="font-medium">{idea}</h3>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
