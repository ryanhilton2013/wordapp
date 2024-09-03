"use client"
import { useState, useEffect } from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import  AboutWord from '@/components/AboutWord'; 
import  ErrorBox from '@/components/ui/ErrorBox'; 

const wordValidation = new RegExp(
  /^[a-zA-Z0-9-]+$/ 
);

export default function Home() {
  const [word, setWord] = useState<string>('');
  const [wordDefinition, setWordDefinition] = useState<string[]>([]); 
  const [errorMessage, setErrorMessage] = useState<string>(""); 
  const formSchema = z.object({
    word: z.string()
    .nonempty({
        message: "Required",
      })    
    .max(64, {
        message: "The word must be less than 64 characters."
      })
    .regex(wordValidation, {
        message: 'The word can only contain letters or numbers.',
      })
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      word: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const searchWord = values.word;
    const data = await fetchData(searchWord)
      .then(data => {
        if(data.definitions.length){
          setErrorMessage("");   
          setWord(searchWord);  
          form.reset()          
          setWordDefinition(data.definitions);  
        } else {
          setWord(searchWord);             
          setWordDefinition([]);  
          setErrorMessage(`No definition found for the word ${searchWord}.`);   
        }
      })
      .catch (err => {    
        setWord("");             
        setWordDefinition([]);
        setErrorMessage(err);
      });
  }
  const fetchData = (word: string): Promise<any> => {
    const url = `/api/words/${word}`;
    return fetch(url)
      .then(response => {
        if (!response.ok) {
          if (response.status === 404) {
            return Promise.reject(`Word not found: ${word}`);
          } else if (response.status === 401) {
            return Promise.reject(`Error (401) communicating with server, contact support.`);
          } else {
            return response.json().then(data => {
              let errorMessage: string = 'Unexpected error: ';              
              errorMessage = data.error ? `${errorMessage} ${data.error}` : `${errorMessage} ${response.statusText}`;
              return Promise.reject(errorMessage);
            });
          }
        }
        return response.json();
      })
      .then(data => {
        return data;
      })
      .catch(err => {
        return Promise.reject(err);
      });
  };
  return (
    <main className="flex min-h-fit flex-col items-center justify-between p-24">
      <h1 className="text-2xl" >Word Definition</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-md  w-full ">
          <FormField
            control={form.control}
            name="word"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter Any Word:</FormLabel>
                <FormControl>
                  <Input placeholder="a single word" type="text" {...field} />
                </FormControl>
                <FormDescription>
                  Enter any word to get its definition(s).
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">Submit</Button>
        </form>
      </Form>  
      <ErrorBox description={errorMessage} />
      <AboutWord definitions={wordDefinition} word={word} />
    </main>
  );
}
